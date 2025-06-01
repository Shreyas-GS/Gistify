# Gistify - Chrome Extension 🚀

**Gistify** is a powerful and lightweight Chrome extension that enhances your browsing experience by **blocking intrusive ads** and **summarizing web content** into concise, easy-to-read insights.

## 🔍 Features

- 🚫 **Ad Blocking**  
  Automatically blocks annoying and potentially malicious advertisements to provide a clutter-free browsing experience.

- 🧠 **Content Summarization**  
  Summarizes the main content of the web page using AI-powered summarization to give you the gist — fast and smart.

- 🧩 **Seamless Integration**  
  Works directly in your browser with a simple and intuitive UI.

- 🔒 **Privacy-Focused**  
  No tracking or data collection — your browsing data stays yours.

## 📦 Installation

1. Download or clone this repository:
   ```bash
   git clone https://github.com/Shreyas-GS/Gistify.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle switch on top right)

4. Click **Load unpacked**

5. Select the folder where you unzipped/cloned the extension

6. Start using **Gistify**!

## 🛠️ Usage

1. Click on the Gistify icon in the Chrome toolbar.
2. Use the toggles to:
   - Enable/disable ad blocking
   - Generate summaries for the current webpage
3. The summary will appear in the popup/sidebar.
4. Ads will be removed automatically as pages load.

## 🧰 Tech Stack

- HTML5, CSS3, JavaScript
- Chrome Extension APIs
- Gemini API / Hugging Face API (for summarization)
- Manifest V3

## 📁 Project Structure

```
Gistify/
├── icons/               # Extension icons
├── background.js        # Background script for ad blocking
├── content.js           # Injected content script for DOM access
├── popup.html           # Extension popup UI
├── popup.js             # Logic for popup
├── manifest.json        # Chrome extension config
└── styles.css           # Styling for popup
```

## ⚙️ Configuration

To use summarization via Gemini or Hugging Face:

- Replace the API key in `content.js`:
  ```js
  const API_KEY = 'your-api-key-here';
  ```

## 🧪 Known Issues

- Some dynamic ad networks may bypass basic filters.
- Summarization may be slower on pages with large or poorly structured content.

## ✨ Future Enhancements

- Custom ad filter lists
- Language selection for summaries
- Options page for API key configuration
- Dark mode UI

## 🧑‍💻 Author

Created by **Shreyas GS**  
🔗 [LinkedIn](https://www.linkedin.com/in/shreyasgs/) | ✉️ shreyasgs@example.com

---

> Gistify – Get the **gist** of the web and block the **rest**.
