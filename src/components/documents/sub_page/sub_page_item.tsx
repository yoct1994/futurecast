import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import * as S from "../styles";
import { Link } from "react-router-dom";
import {
  deleteItemsState,
  documentListState,
  isEditDocumentState,
} from "../../../recoil/recoil";
import { ReactComponent as Close } from "../../../assets/Close.svg";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { deepClone } from "ag-charts-community/dist/types/src/module-support";

type Props = {
  index: number;
  item: any;
  uniqueReferences: any[];
  documentIdx: number;
};

const SubPageItem = ({ index, item, uniqueReferences, documentIdx }: Props) => {
  const isEdit = useRecoilValue(isEditDocumentState);
  const theme = useContext(ThemeContext);
  const setDeleteItems = useSetRecoilState(deleteItemsState);

  const [documents, setDocuments] = useRecoilState(documentListState);

  return (
    <S.SubDocumentItem key={index} as={Link} to={`/document/${item.page_id}`}>
      <S.SubDocumentQuery>{item.document_query.full_text}</S.SubDocumentQuery>
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
      {isEdit && (
        <S.DeleteSubPageIcon
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(item);
            setDeleteItems((i) => [
              ...i,
              {
                data: item,
                type: "SUB_PAGE",
              },
            ]);

            const i = JSON.parse(JSON.stringify(documents));
            console.log("item ::::: ", i[documentIdx]);
            i[documentIdx].children = i[documentIdx].children.filter(
              (it: any) => it.page_id !== item.page_id
            );
            console.log("Result ::::: ", i);

            setDocuments(i);
          }}
        >
          <Close fill={theme?.color.white} />
        </S.DeleteSubPageIcon>
      )}
    </S.SubDocumentItem>
  );
};

export default SubPageItem;
