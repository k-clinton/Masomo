export interface Message {
  id: string;
  sender: "visitor" | "assistant";
  text: string;
  timestamp: Date;
}

export const SUGGESTED_PROMPTS = [
  "What services do you offer?",
  "I have a project idea",
  "I need help choosing a service",
];

export const WELCOME_MESSAGE = {
  id: "welcome",
  sender: "assistant" as const,
  text: "Hello! Welcome to Harnes 24/7. I can assist you with any questions regarding our premium academic tutoring, essay writing support, exam preparation, or dissertation guidance. How can I help you today?",
  timestamp: new Date(),
};

const RESPONSES: Record<string, string> = {
  "what services do you offer?":
    "We provide top tier academic tutoring, essay & assignment support, dissertation & thesis consulting, exam preparation, and academic language support. All programmes are custom-tailored to your syllabus.",
  "i have a project idea":
    "That is exciting! Whether it is a research project, a dissertation proposal, or a custom course syllabus, our team can help you design and execute it. What subject and educational level (e.g. Undergraduate, Master's) is the project for?",
  "i need help choosing a service":
    "I would be glad to help you find the right fit. Could you share what level of study you are currently in and what specific academic challenges you are looking to address?",
};

const FALLBACK_RESPONSES = [
  "That sounds interesting. Could you tell me a bit more about your course, the subject matter, and what specific help or timeline you have in mind?",
  "I would love to help you with that. To give you the most accurate advice, what educational level (Undergraduate, Postgraduate, etc.) is this for?",
  "Thanks for reaching out! To help you begin your academic journey, you can also fill out our Quote Calculator at /get-a-quote to see an instant estimate for your course assistance.",
  "I see. Our academic tutors cover a wide range of subjects. Could you share the name of the course or subject you're working on?",
];

export class ChatService {
  private messages: Message[] = [WELCOME_MESSAGE];
  private listeners: (() => void)[] = [];

  public getMessages(): Message[] {
    // Return a clone to prevent mutation
    return [...this.messages];
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public async sendMessage(text: string): Promise<void> {
    if (!text.trim()) return;

    const visitorMsg: Message = {
      id: `visitor-${Date.now()}`,
      sender: "visitor",
      text,
      timestamp: new Date(),
    };

    this.messages.push(visitorMsg);
    this.notify();

    // Trigger simulated assistant reply
    await this.triggerAssistantReply(text);
  }

  private async triggerAssistantReply(visitorText: string): Promise<void> {
    // 1. Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

    const normalized = visitorText.trim().toLowerCase().replace(/[?.!]$/, "");
    let replyText = RESPONSES[normalized];

    if (!replyText) {
      // Find partial matches
      const matchKey = Object.keys(RESPONSES).find((key) => normalized.includes(key) || key.includes(normalized));
      if (matchKey) {
        replyText = RESPONSES[matchKey];
      } else {
        // Fallback response selection
        const idx = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
        replyText = FALLBACK_RESPONSES[idx];
      }
    }

    const assistantMsg: Message = {
      id: `assistant-${Date.now()}`,
      sender: "assistant",
      text: replyText,
      timestamp: new Date(),
    };

    this.messages.push(assistantMsg);
    this.notify();
  }

  public clearConversation() {
    this.messages = [WELCOME_MESSAGE];
    this.notify();
  }
}

// Export a single global instance for simplicity, but allow new instances if needed
export const defaultChatService = new ChatService();
