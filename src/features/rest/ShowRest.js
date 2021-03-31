import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {doClear, selectRestValue, startGetFoo} from "./restSlice";
import * as s from 'superstruct';
import {useForm} from "react-hook-form";
import {superstructResolver} from "@hookform/resolvers/superstruct";
import * as debug from 'debug';

const logger = debug('lsamp:ShowRest');

export const coerceFormNumber = (target) => s.coerce(target, s.string(), v => {
  if (v == null) {
    return v;
  } else {
    const r = parseFloat(v);
    if (isNaN(r)) {
      return v;
    }
    return r;
  }
});

export function evaluateByPath(it, path) {
  return path.split(/[,[\].]+?/)
    .filter(Boolean)
    .reduce(
      (result, key) => (result == null ? result : result[key]),
      it,
    );
}

export const hasError = (errors, ...paths) => {
  return (paths || []).find(path => {
    return evaluateByPath(errors, path) != null;
  });
}

const schema = s.object({
  id: coerceFormNumber(s.number())
});

export function ShowRest() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const restValue = useSelector(selectRestValue);
  const form = useForm({
    resolver: superstructResolver(schema, {
      coerce: true
    })
  });
  const {register, handleSubmit, watch, errors, reset} = form;
  const doHandleSubmit = async data => {
    const postId = data.id;
    logger("submit post id: %s", postId);
    setLoading(true);
    await dispatch(startGetFoo(postId));
    setLoading(false);
  }

  const onClear = () => {
    dispatch(doClear());
  }
  const prepareDisplay = input => {
    return JSON.stringify(input, null, 2);
  }
  return (
    <div className={"vw-50 text-left"}>
      <h4>Rest example</h4>
      <div className="vh-50">
        <p>{restValue?.status}</p>
        <pre>{prepareDisplay(restValue?.body)}</pre>
      </div>
      <div className="mt-2 text-center">
        <form className={"form-inline"} onSubmit={handleSubmit(doHandleSubmit)} noValidate>
          <div className="form-group">
            <label for="postId">No:</label>
            <input type="text" className={`form-control ${hasError(errors, "id")}`} name="id" id="postId" ref={register}
                   placeholder="Post ID"/>
          </div>
          <input className={"btn btn-primary ml-1"} type={"submit"}
                 disabled={loading} value="Get" />
          <button className={"btn btn-secondary ml-1"}
                  onClick={onClear}>Reset
          </button>
        </form>
        {JSON.stringify(errors)}
      </div>
    </div>
  );
}
