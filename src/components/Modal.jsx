import PropTypes from 'prop-types';
import '../styles/modal_overlay.css'

export default function Modal({ onClose, children}){
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
Modal.propTypes = {
  isOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};