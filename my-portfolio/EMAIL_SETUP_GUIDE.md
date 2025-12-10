# Email Form Setup Guide

Your contact form is now configured to work with **Formspree**, a free service that doesn't require a backend.

## Quick Setup (3 minutes)

### Step-by-Step Instructions:

1. **Create a Formspree account (FREE):**
   - Go to https://formspree.io
   - Click "Get Started" 
   - Sign up with your email (lilithtpdolohov@gmail.com)

2. **Create a new form:**
   - After signing in, click "New Form"
   - Name it "Portfolio Contact Form"
   - Set email to: lilithtpdolohov@gmail.com
   - Copy your form endpoint (looks like: `https://formspree.io/f/xyzabc123`)

3. **Add the endpoint to your code:**
   - Open `src/App.jsx`
   - Find the line: `fetch('https://formspree.io/f/YOUR_FORM_ID', {`
   - Replace `YOUR_FORM_ID` with your actual form ID (the part after `/f/`)
   - Example: If your endpoint is `https://formspree.io/f/mblabcde`, replace with:
     ```javascript
     fetch('https://formspree.io/f/mblabcde', {
     ```

4. **Test it:**
   - Save the file
   - Your site should automatically reload
   - Fill out the form and submit
   - Check your email!

## Current Features

✅ Client-side validation (name, email, details required)
✅ Email format validation
✅ Terms of service checkbox enforcement
✅ Loading state during submission ("Sending...")
✅ Success/error messages
✅ Fallback to mailto link if API fails
✅ Form reset after successful submission
✅ Professional email formatting

## Testing

After adding your access key:
1. Run: `npm run dev`
2. Navigate to the Contact section
3. Fill out all required fields
4. Check the "I agree to Terms" checkbox
5. Click "Send Inquiry"
6. You should see "Sending..." then a success message
7. Check your email inbox!

## Troubleshooting

**Form not submitting?**
- Check browser console for errors (F12)
- Make sure you replaced 'YOUR_ACCESS_KEY_HERE' with real key
- Verify internet connection

**Not receiving emails?**
- Check spam folder
- Verify the email address in Web3Forms dashboard
- Test with a different email service

**Mailto fallback opening instead?**
- This means the API request failed
- Check your access key is correct
- Check network tab in browser dev tools

## Need Help?

Contact me or check:
- Web3Forms docs: https://docs.web3forms.com
- Formspree docs: https://help.formspree.io
