import React from "react";


export  const Checkbox = React.forwardRef(({ interminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
         const resolvedRef = ref || defaultRef;
    React.useEffect(() => {
      resolvedRef.current.interminate = interminate;
    }, [resolvedRef, interminate]);
    return (
      <div>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
    );
  });


