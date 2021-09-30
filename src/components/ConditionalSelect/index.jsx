import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

const ConditionalSelect = ({
  labelId,
  selectId,
  inputLabelId,
  value,
  onChange,
  disabled,
  MenuProps,
  classes,
  data,
  label,
  condition,
  textModification,
  valueModification
}) => {
return (
  <FormControl className={classes.formControl}>
    <InputLabel id={inputLabelId}>{label}</InputLabel>
    <Select
      labelId={labelId}
      id={selectId}
      value={value}
      onChange={onChange}
      disabled={disabled}
      MenuProps={MenuProps}
    >
      {condition && data.map((v,i) => {
          return (
            <MenuItem key={valueModification(i)} value={valueModification(i)}>
              <ListItemText primary={textModification(i)} />
            </MenuItem>
          )
      })
    }
    </Select>
  </FormControl>
)}

const ConditionalSelect2 = ({
  labelId,
  selectId,
  inputLabelId,
  value,
  onChange,
  disabled,
  MenuProps,
  classes,
  data,
  label,
  condition,
  condition2,
  textModification,
  valueModification
}) => (
  <FormControl className={classes.formControl}>
    <InputLabel id={inputLabelId}>{label}</InputLabel>
    <Select
      labelId={labelId}
      id={selectId}
      value={value}
      onChange={onChange}
      disabled={disabled}
      MenuProps={MenuProps}
    >
      {condition && data.map((v,i) => {
        if(condition2(v,i,data)){
          return ( 
            <MenuItem key={valueModification(v,i)} value={valueModification(v,i)}>
              <ListItemText primary={textModification(v,i)} />
            </MenuItem>
          )
        }
      })
    }
    </Select>
  </FormControl>
)

const ConditionalSelectMultiple = ({
  labelId,
  selectId,
  inputLabelId,
  value,
  onChange,
  onClear,
  disabled,
  MenuProps,
  classes,
  data,
  label,
  condition,
  textModification,
  checked,
  renderValue,
  valueModification
}) => (
  <FormControl className={classes.formControl}>
    
    <InputLabel id={inputLabelId}>{label}</InputLabel>
    <Select
      labelId={labelId}
      id={selectId}
      value={value}
      onChange={onChange}
      disabled={disabled}
      MenuProps={MenuProps}
      multiple
      input={<Input />}
      renderValue={renderValue}
    >
      {condition && data.map((v,i) => {
        return (
          <MenuItem key={valueModification(v)} value={valueModification(v)}>
              <Checkbox checked={checked(v,i,data)} />
              <ListItemText primary={textModification(v)} />
          </MenuItem>
        )
      })
    }
    </Select>
    <IconButton
      onClick={onClear}
      aria-label="delete"
      className={classes.del}
      size="large">
      <Icon fontSize="small" >clear</Icon>
    </IconButton>
  </FormControl>
)

export {ConditionalSelectMultiple, ConditionalSelect, ConditionalSelect2}