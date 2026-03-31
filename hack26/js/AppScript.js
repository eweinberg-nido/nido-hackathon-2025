function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return respond({ success: false, error: 'No data received' }, 400);
  }

  let data = {};
  try {
    data = JSON.parse(e.postData.contents || '{}');
  } catch (err) {
    return respond({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const intent = data.intent || 'participant_signup';
  const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const participantSheet = getOrCreateSheet_(ss, 'Participants', ['Timestamp', 'Name', 'School', 'Email']);
  const sponsorSheet = getOrCreateSheet_(ss, 'Sponsors', ['Timestamp', 'Name', 'Company', 'Email', 'Focus', 'Notes']);
  const teamsSheet = getOrCreateSheet_(ss, 'Teams', [
    'Timestamp',
    'Team Name',
    'Member 1',
    'Member 2',
    'Member 3',
    'Member 4',
    'Mentor Preference 1',
    'Mentor Preference 2',
    'Mentor Preference 3'
  ]);

  if (intent === 'team_registration' && teamsSheet) {
    teamsSheet.appendRow([
      timestamp,
      data.teamName || '',
      data.member1 || '',
      data.member2 || '',
      data.member3 || '',
      data.member4 || '',
      data.mentor1 || '',
      data.mentor2 || '',
      data.mentor3 || ''
    ]);
    return respond({ success: true, type: 'team' });
  }

  if ((intent === 'sponsor_interest' || intent === 'sponsor_inquiry') && sponsorSheet) {
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
  if (output.setHeader) {
    output.setHeader('Access-Control-Allow-Origin', '*');
    output.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (statusCode && output.setResponseCode) output.setResponseCode(statusCode);
  return output;
}
