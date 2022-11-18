import { ChangeEvent } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import TextField, { BaseTextFieldProps } from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import { CircularProgress, InputAdornment } from "@mui/material";

export interface Props extends BaseTextFieldProps {
  name?: string;
  control?: Control<FieldValues | any, object>;
  label?: string;
  loading?: boolean;
  loadingIconField?: boolean;
  mask?: string | string[];
  defaultValue?: string;
  IsRequired?: boolean;
  getValue?: (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  propsInput? : any;

}

export const Input = ({ 
  name, 
  control, 
  label, 
  loading = false,
  loadingIconField = false,
  defaultValue = "", 
  IsRequired = false, 
  getValue, 
  propsInput,
  mask = undefined,
   ...rest}: Props) =>{
 
    if (loading) {
      return (
        <Skeleton animation="wave" width="100%" >
          <TextField size="small" />
        </Skeleton>
      )
    }

    return (
      <Controller
        name={name || ""}
        control={control}
        defaultValue={defaultValue ?? ""}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={(event) => {
              if(!!mask){
                onChange(event.target.value)
              }
              else{
                onChange(event)
              }
              
              !!getValue && getValue(event)
            }}
            value={value}
            fullWidth
            label={IsRequired ? label + " *" : label}
            variant="outlined"
            type="text"            
            ref={ref}
            InputProps={
              {...propsInput,                
                endAdornment: (
                <>
                  {loadingIconField ? <CircularProgress color="inherit" size={20} /> : null}
                  
                </>
              )}
              
              
            }    
                      
            {...rest}
          />
        )}
      />
    );
}