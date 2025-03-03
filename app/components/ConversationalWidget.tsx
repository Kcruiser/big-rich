"use client"

interface ConversationalWidgetProps {
  isVisible: boolean
}

export default function ConversationalWidget({ isVisible }: ConversationalWidgetProps) {
  return (
    <>
      <style jsx global>{`
        @media (max-width: 768px) {
          elevenlabs-convai {
            transform: scale(0.5);
            transform-origin: bottom right;
          }
        }

        elevenlabs-convai {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 100 !important;
          transition: opacity 0.3s ease-in-out !important;
          background: transparent !important;
        }

        elevenlabs-convai.hidden {
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
      <elevenlabs-convai agent-id="C25KqdgQbXZXGwa1OJcC" className={!isVisible ? "hidden" : ""} />
      <script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript" />
    </>
  )
}

