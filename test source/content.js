// Function to hide ad elements
console.log("This is running");
function hideAdElements() {
  console.log("Hiding ads...");

  let adSelectors = [
    ".ad",
    ".ads",
    ".banner-ad",
    ".popup-ad",
    "div[class*='ad-']",
    "iframe[src*='ad']",
    "img[src*='ad']",
  ];

  adSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((ad) => ad.remove());
  });

  console.log("Ads removed successfully.");
}

// Run the ad hiding function when the page loads
document.addEventListener("DOMContentLoaded", hideAdElements);

// Function to extract the main content from the page
function extractContent() {
  let content = "";

  // Extract meta description if available
  const metaDescription = document.querySelector("meta[name='description']");
  if (metaDescription && metaDescription.content) {
    content += metaDescription.content + " ";
  }

  // Extract text from headings (h1, h2) and paragraphs (p)
  document.querySelectorAll("h1, h2, p").forEach((el) => {
    if (el.innerText.trim()) {
      content += el.innerText.trim() + " ";
    }
  });

  // Log extracted content to check if it's valid
  console.log("Extracted Content: ", content);

  // Limit the content length to 5000 characters (to fit API constraints)
  const finalContent = content.trim().slice(0, 5000);
  console.log("Final Content to Summarize: ", finalContent);

  if (!finalContent) {
    console.warn("No content was extracted from the webpage.");
    return "No content extracted.";
  }
  return finalContent;
}

// Function to summarize content using the Gemini API
async function summarizeContent(text, length) {
  try {
    const trimmedText = text.slice(0, 5000); // Ensure within API limits

    // Define summary length instructions
    let lengthInstruction = "";
    let maxTokens = 100; // Default max tokens for short summary

    if (length === "1") {
      lengthInstruction = "Summarize this in 1-2 concise sentences.";
      maxTokens = 100;
    } else if (length === "2") {
      lengthInstruction =
        "Summarize this in 3-5 sentences, keeping it balanced.";
      maxTokens = 200;
    } else if (length === "3") {
      lengthInstruction =
        "Summarize this in a detailed paragraph of 7-8 sentences.";
      maxTokens = 300;
    }

    console.log(
      "Sending content for summarization with length:",
      lengthInstruction
    );
    const API_KEY = 'YOUR_API_KEY'
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${lengthInstruction}\n\n${trimmedText}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: maxTokens,
          },
        }),
      }
    );

    const data = await response.json();
    console.log("API Response:", data);

    if (data?.candidates?.length > 0) {
      const candidate = data.candidates[0];
      if (candidate?.content?.parts?.length > 0) {
        return candidate.content.parts[0].text || "Failed to generate summary.";
      }
    }

    return "No summary content returned.";
  } catch (error) {
    console.error("Error summarizing:", error);
    return "Error occurred while summarizing.";
  }
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "hideAds") {
    hideAdElements();
  }

  if (request.type === "summarize") {
    console.log("Received summarize request with length:", request.length);

    const content = extractContent();
    if (!content || content === "No content extracted.") {
      chrome.runtime.sendMessage({
        type: "summary",
        summary: "No content extracted.",
      });
      return;
    }

    // Use the Gemini API to get the summary with the specified length
    summarizeContent(content, request.length).then((summary) => {
      chrome.runtime.sendMessage({ type: "summary", summary });
    });
  }
});


console.log("content.js is running...");
