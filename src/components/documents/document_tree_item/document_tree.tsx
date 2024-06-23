import React, { useState } from "react";
import * as S from "../styles";
import { Link } from "react-router-dom";

type Props = {
  item: any;
};

const DocumentTree = ({ item }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <S.DocumentTreeWrapper>
      <S.DocumentTreeTextContainer>
        <S.DocumentTreeText
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          as={Link}
          to={`${item.id === "Main" ? "/" : `/document/${item.id}`}`}
        >
          {item.display}
        </S.DocumentTreeText>
      </S.DocumentTreeTextContainer>
      {item.display.length > 20 && isHover && (
        <S.TreeViewMoreWrapper>{item.display}</S.TreeViewMoreWrapper>
      )}
    </S.DocumentTreeWrapper>
  );
};

export default DocumentTree;
