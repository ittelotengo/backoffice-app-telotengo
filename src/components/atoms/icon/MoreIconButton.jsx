import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MoreIconButton = ({
  anchorEl,
  setAnchorEl,
  ariaControls = 'option-menu',
  ...props
}) => (
  <IconButton
    aria-label="more"
    id="option-button"
    aria-controls={anchorEl ? ariaControls : undefined}
    aria-expanded={anchorEl ? 'true' : undefined}
    aria-haspopup="true"
    onClick={event => {
      setAnchorEl(event.currentTarget);
    }}
    {...props}>
    <MoreVertIcon />
  </IconButton>
);

export default MoreIconButton;