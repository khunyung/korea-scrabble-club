import { useState } from 'react'
import { en, ko } from '../i18n'

// Club contact details, shown on the homepage and the About page.
// Change them here and both pages update.
export const CONTACT_EMAIL = 'minsueinwkim@gmail.com'
export const KAKAO_ID = 'khunyung2377'

type ContactCardsProps = {
  isEnglish: boolean
}

function ContactCards({ isEnglish }: ContactCardsProps) {
  const tx = (isEnglish ? en : ko).about
  const [copied, setCopied] = useState(false)

  const copyKakaoId = async () => {
    try {
      await navigator.clipboard.writeText(KAKAO_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Copying can be blocked by the browser; the ID is still shown on screen
    }
  }

  return (
    <div className="contact-list">
      <a href={`mailto:${CONTACT_EMAIL}`} className="contact-card">
        <span className="contact-label">{tx.email}</span>
        <strong>{CONTACT_EMAIL}</strong>
      </a>
      <button type="button" className="contact-card" onClick={copyKakaoId}>
        <span className="contact-label">
          {tx.kakaotalkId}
          <span className="contact-hint">{copied ? tx.copied : tx.clickToCopy}</span>
        </span>
        <strong>{KAKAO_ID}</strong>
      </button>
    </div>
  )
}

export default ContactCards
