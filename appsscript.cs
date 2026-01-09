function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return respond({ success: false, error: 'No data received' }, 400);
  }

  const data = JSON.parse(e.postData.contents || '{}');
  const intent = data.intent || 'participant_signup';
  const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const participantSheet = getOrCreateSheet_(ss, 'Participants', ['Timestamp', 'Name', 'School', 'Email']);
  const sponsorSheet = getOrCreateSheet_(ss, 'Sponsors', ['Timestamp', 'Name', 'Company', 'Email', 'Focus', 'Notes']);

  if (intent === 'sponsor_interest' && sponsorSheet) {
    sponsorSheet.appendRow([
      timestamp,
      data.name || '',
      data.company || '',
      data.email || '',
      data.focus || '',
      data.notes || ''
    ]);
    sendEmail('New Sponsor Inquiry', data);
    return respond({ success: true, type: 'sponsor' });
  }

  if (participantSheet) {
    participantSheet.appendRow([
      timestamp,
      data.name || '',
      data.school || '',
      data.email || ''
    ]);
    sendEmail('New Participant Signup', data);
    return respond({ success: true, type: 'participant' });
  }

  return respond({ success: false, error: 'Sheets not found' }, 500);
}

function getOrCreateSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    return sheet;
  }

  // Add headers if missing/empty
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = firstRow.some(value => value);
  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  return sheet;
}

function sendEmail(subject, data) {
  const recipient = 'YOUR_EMAIL_HERE'; // update with destination
  if (!recipient) return;

  const rows = Object.keys(data)
    .map(key => `<p><b>${key}:</b> ${data[key]}</p>`)
    .join('');

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: `<h3>${subject}</h3>${rows}`
  });
}

function respond(payload, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  if (statusCode) output.setResponseCode(statusCode);
  return output;
}
