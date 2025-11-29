# Nido Hackathon Website - Simple Guide

## Overview
This is Nido Hackathon event website. Built with HTML, CSS, and JavaScript using Tailwind CSS for styling. Features a modern design with glassmorphism effects, fade-in animations, and a responsive layout.

## File Structure
- `index.html` - Main website file
- `images/` - Directory for sponsor logos and gallery images
- `explanation.md` - This guide
- `previous-hackathon.html` - This is where we show the section with the prev hackathon

## Main Sections

### 1. Navigation
- Fixed header with logo and menu links
- **Nido logo** displayed on the top right (desktop only)
- Header is hidden on page load and appears when scrolling down
- Mobile hamburger menu
- Smooth scrolling between sections

### 2. Hero Section
- **Full viewport height** - fills the entire screen on load
- **Fade-in animation** - transitions from dark to bright gradient background
- Main title with gradient text
- Countdown timer to the hackathon date
- Email signup form for Google Sheets integration (below countdown)
- All content is centered vertically and horizontally

### 3. Previous Hackathon Section (NEW)
- **Stats Cards**: Shows 40 attendees, 11 projects, 4 internships
- **Gallery Carousel**: For photos and videos from previous hackathon

### 4. About Section
- Explains what a hackathon is
- Theme and benefits

### 5. Speakers Section
- Friday and Saturday speaker information

### 6. Schedule Section
- Two-day event timeline

### 7. Sponsors Section
- Sponsor logos and information

### 8. Prizes & Judging Section
- Prize information and judging criteria
- **Note:** This section is currently hidden

### 9. FAQ Section
- Interactive accordion with common questions

## How to Add Images and Videos to the Gallery

### Step 1: Add Images to the Images Folder
1. Save your hackathon photos/videos in the `images/` folder
2. Use descriptive names like `hackathon-1.jpg`, `team-working.jpg`, etc.

### Step 2: Update the Carousel HTML
Find this section in the HTML (around line 136):
```html
<div class="carousel-container flex transition-transform duration-500 ease-in-out" id="carousel-container">
    <!-- Carousel items will be added here -->
    <div class="carousel-item w-full flex-shrink-0 text-center py-12">
        <div class="text-gray-500 text-lg">
            <p class="mb-4">📸 Add your hackathon photos here</p>
            <p class="text-sm">Replace this placeholder with actual images</p>
        </div>
    </div>
</div>
```

Replace the placeholder with your images:
```html
<div class="carousel-container flex transition-transform duration-500 ease-in-out" id="carousel-container">
    <!-- Image 1 -->
    <div class="carousel-item w-full flex-shrink-0">
        <img src="images/hackathon-1.jpg" alt="Hackathon participants working" class="w-full h-64 object-cover rounded-lg">
    </div>
    
    <!-- Image 2 -->
    <div class="carousel-item w-full flex-shrink-0">
        <img src="images/team-working.jpg" alt="Team collaboration" class="w-full h-64 object-cover rounded-lg">
    </div>
    
    <!-- Video -->
    <div class="carousel-item w-full flex-shrink-0">
        <video class="w-full h-64 object-cover rounded-lg" controls>
            <source src="images/hackathon-video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</div>
```

### Step 3: Update the Dots Navigation
Find this section (around line 159):
```html
<div class="flex justify-center mt-4 space-x-2" id="carousel-dots">
    <button class="w-3 h-3 rounded-full bg-cyan-500" onclick="currentSlide(1)"></button>
</div>
```

Add a dot for each image/video:
```html
<div class="flex justify-center mt-4 space-x-2" id="carousel-dots">
    <button class="w-3 h-3 rounded-full bg-cyan-500" onclick="currentSlide(1)"></button>
    <button class="w-3 h-3 rounded-full bg-gray-300" onclick="currentSlide(2)"></button>
    <button class="w-3 h-3 rounded-full bg-gray-300" onclick="currentSlide(3)"></button>
</div>
```

### Step 4: Update JavaScript
Find this line in the JavaScript (around line 439):
```javascript
const totalSlides = 1; // Update this when you add more slides
```

Change the number to match your total images/videos:
```javascript
const totalSlides = 3; // Update this when you add more slides
```

## Quick Updates for Next Hackathon

### Show/Hide Sections
- To show the Prizes & Judging section, remove the `hidden` class from the section element (around line 242)
- To add it back to navigation, add the link back to both desktop and mobile menus

### Update Stats
Find these lines in the Previous Hackathon section:
```html
<h3 class="text-3xl font-bold text-cyan-600 mb-2" id="attendees-count">40</h3>
<h3 class="text-3xl font-bold text-cyan-600 mb-2" id="projects-count">11</h3>
<h3 class="text-3xl font-bold text-cyan-600 mb-2" id="prizes-given">4 Internships</h3>
```
Update the numbers and text as needed.

### Update Content
- Change speakers, schedule, sponsors, and theme in their respective sections
- Update the title from "Nido Hackathon 2025" to your new year
- Update the hero title (currently "Nido Hackathon [26]") in the HTML
- Modify the FAQ section with relevant questions
- Update the countdown date in JavaScript (currently set to April 10, 2026 15:30:00)

### Update Countdown Date
Find this line in the JavaScript (around line 500):
```javascript
const hackathonDate = new Date("April 10, 2026 15:30:00").getTime();
```
Change the date and time to your new hackathon date.

### Update Logo
The Nido logo is located at `images/Sponsors/nido.jpg`. To change it:
1. Replace the file with your new logo (keep the same filename), OR
2. Update the image path in the header section (around line 99)

### Update Navigation Links
- To show/hide sections, add or remove the `hidden` class from section elements
- Update navigation links in both desktop nav (around line 99) and mobile menu (around line 115)

## Tips
- Keep images under 2MB for faster loading
- Use JPG for photos, PNG for logos with transparency
- Videos should be MP4 format
- Test the carousel navigation after adding new content

## Email Signup Form - Google Sheets Integration

The website now includes an email signup form that connects to Google Sheets. The form is located in the Hero section, replacing the countdown timer.

### How to Test if Google Sheets Connection is Working

#### Step 1: Verify Your Google Apps Script is Set Up
1. Open your Google Apps Script project (the one with the endpoint URL in the code)
2. Make sure your script is deployed as a web app with:
   - Execute as: "Me"
   - Who has access: "Anyone" or "Anyone with Google account"
3. The script should handle POST requests and write data to your Google Sheet

#### Step 2: Check Your Google Apps Script Code
Your Google Apps Script should look something like this:
```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Email', 'Timestamp']);
    }
    
    // Append the email and timestamp
    sheet.appendRow([data.email, data.timestamp]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Important:** Replace `'YOUR_SHEET_ID'` with your actual Google Sheet ID.

#### Step 3: Test the Form Submission
1. Open your website in a web browser
2. Scroll to the Hero section where the email signup form is located
3. Enter a test email address (e.g., `test@example.com`)
4. Click the "Sign Up" button
5. You should see a success message: "Thank you! You've been successfully signed up."

#### Step 4: Verify Data in Google Sheets
1. Open your Google Sheet
2. Check if a new row was added with:
   - The email address you entered in column A
   - A timestamp in column B (ISO format)
3. If the data appears, the connection is working correctly!

#### Step 5: Troubleshooting

**If the form shows an error message:**
- Check your browser's console (F12 → Console tab) for any error messages
- Verify that your Google Apps Script endpoint URL is correct in `index.html` (line 382)
- Make sure your Google Apps Script is deployed and the deployment is active
- Check that your Google Sheet has the correct permissions

**If no data appears in Google Sheets:**
- Verify your Google Apps Script has permission to access the sheet
- Check that the Sheet ID in your script matches your actual Google Sheet
- Make sure your script is deployed as a web app (not just saved)
- Check the Google Apps Script execution log for errors (View → Execution log)

**If you see CORS errors:**
- The form uses `mode: "no-cors"` which is normal for Google Apps Script
- The form will show a success message even if it can't read the response (this is expected behavior)

#### Step 6: Test Multiple Submissions
1. Try submitting different email addresses
2. Verify each submission creates a new row in your Google Sheet
3. Check that timestamps are being recorded correctly

### Updating the Google Sheets Endpoint

If you need to change the Google Apps Script endpoint URL:
1. Find this line in `index.html` (around line 382):
   ```javascript
   const endpoint = "https://script.google.com/macros/s/YOUR_ENDPOINT_URL/exec";
   ```
2. Replace `YOUR_ENDPOINT_URL` with your new Google Apps Script web app URL
3. Make sure to include the full URL including `/exec` at the end
