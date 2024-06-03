import * as S from "../styles";
import { Link } from "react-router-dom";

type Props = {
  index: number;
  item: any;
  uniqueReferences: any[];
};

const SubPageItem = ({ index, item, uniqueReferences }: Props) => {
  return (
    <S.SubDocumentItem key={index} as={Link} to={`/document/${item.page_id}`}>
      <S.SubDocumentQuery>{item.document_query.full_text}</S.SubDocumentQuery>
      <S.SubDocumentContent>
        {`${
          item.document_content
            ? item.document_content.full_text
            : "No Contents"
        }`}
      </S.SubDocumentContent>
      <S.SubDocumentTagContainer>
        {uniqueReferences.map((value, index) => {
          return (
            <S.SubDocumentTag key={index} index={index} type={value.type}>
              {`${
                value.type === "news"
                  ? "News"
                  : value.type === "casual-graph"
                  ? "Casual Graph"
                  : value.type === "timeseries-chart"
                  ? "Timeseries Chart"
                  : value.type === "bar-chart"
                  ? "Bar Chart"
                  : value.type === "search"
                  ? "Web Search"
                  : value.type
              }`}
              <div style={{ color: `rgba(175, 175, 175, 1)` }}>{` • `}</div>
              {`${value.num}`}
            </S.SubDocumentTag>
          );
        })}
      </S.SubDocumentTagContainer>
    </S.SubDocumentItem>
  );
};

export default SubPageItem;
