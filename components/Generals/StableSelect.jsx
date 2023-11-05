import React, { useId } from "react";
import Select from "react-select";

export default function StableSelect({ ...props }) {
  return <Select {...props} instanceId={useId()} />;
}
