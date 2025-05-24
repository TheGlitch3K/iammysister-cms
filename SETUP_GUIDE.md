# I AM MY SISTER Client Management System - Setup Guide

## Quick Start Guide

### Step 1: Google Sheets Setup
1. **Link your Google Form to a Google Sheet**
   - Open your Google Form
   - Click on "Responses" tab
   - Click the Google Sheets icon
   - Create a new spreadsheet

2. **Make the Sheet accessible**
   - In Google Sheets, click "Share"
   - Change to "Anyone with the link can view"
   - Copy the Sheet ID from the URL (the long string between /d/ and /edit)

3. **Note the Sheet ID**
   - Example URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Copy just the ID part: `YOUR_SHEET_ID_HERE`

### Step 2: Configure the Application
1. **Copy the environment file**
   - Rename `.env.example` to `.env.local`
   
2. **Add your Google Sheet ID**
   - Open `.env.local` in a text editor
   - Replace `your-google-sheet-id-here` with your actual Sheet ID
   - Save the file

### Step 3: Run the Application
1. **Install dependencies** (one-time setup)
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   - Go to http://localhost:3000
   - You should see the dashboard with your data!

## How to Use the Dashboard

### Main Navigation
- **Dashboard**: Overview of all sisters and key statistics
- **Sisters**: Detailed directory of all clients
- **Programs**: Information about your three programs
- **Reports**: Analytics and reporting (coming soon)

### Dashboard Features

#### 1. Statistics Cards
- **Total Sisters**: Number of women in your program
- **Housing Ready**: Women who qualify for homeownership (credit ≥ 620, income ≥ $3000)
- **Wellness Score**: Average mental/emotional health rating
- **Collective Savings**: Total savings across all sisters

#### 2. Search and Filter
- **Search Bar**: Type any name, email, or phone number
- **Status Filters**: 
  - All: Show everyone
  - New: Recent applications
  - Contacted: Sisters you've reached out to
  - Qualified: Ready for next steps

#### 3. Sister Table
- Shows 10 most recent applications
- Click the eye icon to see full details
- Click the mail icon to send email (opens email client)

#### 4. Export Data
- Click "Export" button to download filtered data as CSV
- Opens in Excel automatically

### Viewing Sister Details
1. Click the eye icon next to any sister
2. A panel slides in from the right showing:
   - Contact information
   - Financial assessment
   - Well-being scores (hearts)
   - Support needs
   - Sister's story

### Understanding the Colors

#### Program Badges
- 🟨 **Yellow** = Homeownership Program
- 🟦 **Teal** = Financial Empowerment
- 🟪 **Purple** = Entrepreneurship

#### Status Badges
- 🔵 **Blue** = New application
- 🟡 **Yellow** = Contacted
- 🟢 **Green** = Qualified
- ⚫ **Gray** = Closed

#### Credit Scores
- 🟢 **Green** = Good (700+)
- 🟡 **Yellow** = Fair (600-699)
- 🔴 **Red** = Needs improvement (<600)

## Managing Client Status

### To Update a Sister's Status:
1. Click the eye icon to open sister details
2. Use the status dropdown (coming in next update)
3. Changes save automatically

### Status Workflow:
1. **New** → Sister just applied
2. **Contacted** → You've reached out
3. **In Progress** → Working with sister
4. **Qualified** → Ready for program

## Troubleshooting

### Data Not Showing?
1. Check that your Google Sheet is set to "Anyone with link can view"
2. Verify the Sheet ID in `.env.local` is correct
3. Make sure the form is connected to the sheet
4. Refresh the page (data updates every 30 seconds)

### Can't Start the Application?
1. Make sure Node.js is installed
2. Run `npm install` first
3. Check that you're in the `iammysister-cms` folder

### Export Not Working?
- Check your browser's download settings
- The file saves as `IAMS_Clients_[date].csv`

## Best Practices

### Daily Use
1. Check dashboard each morning for new applications
2. Update sister status as you contact them
3. Export weekly reports for your records

### Data Management
- The system automatically assigns programs based on criteria
- Priority cases (low mental health scores) are flagged
- All data stays in your Google Sheet

### Privacy & Security
- Never share your Google Sheet publicly
- Use "view only" permissions
- Keep sensitive notes brief

## Getting Help

### For Technical Issues:
- Check the error message in your browser
- Restart the application
- Contact your technical support

### For Training:
- Schedule a walkthrough session
- Review this guide
- Practice with test data first

## Quick Reference

### Keyboard Shortcuts
- `Ctrl/Cmd + F`: Focus search bar
- `Esc`: Close sister details panel

### Data Refresh
- Automatic: Every 30 seconds
- Manual: Refresh your browser

### Mobile Access
- The dashboard works on tablets and phones
- Best viewed on desktop for full features

---

**Remember**: This system is designed to save you time and help you serve more sisters effectively. The data flows automatically from your Google Form, so you can focus on what matters most - empowering women!
