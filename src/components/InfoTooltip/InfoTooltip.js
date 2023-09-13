export default function InfoTooltip({ 
  isOpen,
  infoTooltipMessage,
  setIsInfoTooltipOpen,
  setInfoTooltipMessage,
 }) {
  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    setInfoTooltipMessage('');
  }

  return (
    <div className={`info-tooltip ${isOpen ? 'info-tooltip_opened' : ''}`} >
      <div className="info-tooltip__container">
        <button className="info-tooltip__close" type="button" onClick={closeInfoTooltip} />
        <div className="info-tooltip__image_type_err" />
        <h3 className="info-tooltip__title">
          {infoTooltipMessage}
        </h3>
      </div>
    </div>
  )
}

