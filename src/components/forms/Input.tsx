import React, { FC } from 'react';
import {FieldRenderProps} from "react-final-form";

// interface InputProps {
//   input: any;
//   meta: any;
// }
type Props = FieldRenderProps<string, any>;

const Input: FC<Props> = ( { input, meta }: Props ) => (
  <div className="flex-column">
    <input { ...input } className="form-control" />
    <div style={ { color: 'red' } }>
      {meta.error && meta.touched && <small>{meta.error}</small>}
    </div>
  </div>
);

export default Input;
