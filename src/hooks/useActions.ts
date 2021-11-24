import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
// import * as articleAction from '../redux/article/slice';

export default ( actions: any = null ) => {
  const dispatch = useDispatch()
  return bindActionCreators( actions, dispatch )
}
