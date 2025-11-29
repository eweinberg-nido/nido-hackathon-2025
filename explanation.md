# Nido Hackathon Website - Simple Guide

## Overview
This is a single-page website for the Nido Hackathon event. Built with HTML, CSS, and JavaScript using Tailwind CSS for styling. Features a modern design with glassmorphism effects.

## File Structure
- `index.html` - Main website file
- `images/` - Directory for sponsor logos and gallery images
- `explanation.md` - This guide

## Main Sections

### 1. Navigation
- Fixed header with logo and menu links
- Mobile hamburger menu
- Smooth scrolling between sections

### 2. Hero Section
- Main title with gradient text
- Countdown timer (currently set to March 3, 2026)
- "Countdown to March 3rd" heading

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

### Change the Countdown Date
Find this line in the JavaScript:
```javascript
const hackathonDate = new Date("March 3, 2026 00:00:00").getTime();
```
Change the date to your new hackathon date.

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
- Modify the FAQ section with relevant questions

## Tips
- Keep images under 2MB for faster loading
- Use JPG for photos, PNG for logos with transparency
- Videos should be MP4 format
- Test the carousel navigation after adding new content
