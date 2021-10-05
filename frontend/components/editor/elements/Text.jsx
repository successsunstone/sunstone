import React, { useEffect, useRef } from 'react';

const Text = ({
  elementAttr: {
    color, fontFamily, fontSize, fontWeight, text,
  },
  editable,
  setEditable,
  onChange,
  zoom,
  touchHasStarted, touchStarted, touchEnded,
}) => {
  const textRef = useRef(text);

  useEffect(() => {
    if (!editable && onChange) {
      onChange(textRef.current);
    }
  }, [editable]);

  return (
    <div
      contentEditable={editable}
      suppressContentEditableWarning={editable}
      onTouchEnd={(e) => {
        // if (!touchHasStarted) {
          // touchStarted();
          setEditable();
          e.stopPropagation();
        // }
      }}
      // onTouchEnd={() => {
      //   touchEnded();
      // }}
      onClick={(e) => {
        setEditable();
        e.stopPropagation();
      }}
      onInput={(e) => {
        textRef.current = e.currentTarget.textContent;
      }}
      style={{
        color, fontFamily, fontSize: fontSize * zoom, fontWeight,
        padding: '5px',
        cursor: 'text',
        WebkitUserSelect: 'text',
        userSelect: 'text',
        border: editable ? 'thin solid #4af' : '',
      }}
    >
      {textRef.current}
    </div>
  );
};

export default Text;
