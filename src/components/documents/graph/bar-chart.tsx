import { useContext, useEffect, useState } from "react";
import * as S from "../styles";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import MarkdownPreview from "@uiw/react-markdown-preview";
import NodeGraph, { Node } from "react-vis-graph-wrapper";
import { AgCharts } from "ag-charts-enterprise";
import { ReactComponent as Export } from "../../../assets/export-chart.svg";
import { useDrag } from "react-dnd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isDarkModeState,
  isEditDocumentState,
  isLoadingPDFState,
  updateItemsState,
} from "../../../recoil/recoil";
import { ThemeContext } from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";

type Props = {
  item: any;
  setPickRef: React.Dispatch<React.SetStateAction<any>>;
  setPickIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
};

const BarChart = ({ item, setPickRef, index, setPickIndex }: Props) => {
  const [options, setOptions] = useState<AgChartOptions>();
  const isDarkMode = useRecoilValue(isDarkModeState);
  const theme = useContext(ThemeContext);
  const isEdit = useRecoilValue(isEditDocumentState);
  const [content, setContent] = useState("");
  const setUpdateItems = useSetRecoilState(updateItemsState);
  const isLoadingPDF = useRecoilValue(isLoadingPDFState);

  const [{}, drag] = useDrag(() => ({
    type: "ITEM",
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  AgCharts.setLicenseKey(
    "Using_this_{AG_Charts}_Enterprise_key_{AG-061368}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{LG_AI_Research}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{timeseries_forecasting}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{timeseries_forecasting}_need_to_be_licensed___{timeseries_forecasting}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Charts}_Enterprise_versions_released_before_{10_June_2025}____[v3]_[02]_MTc0OTUxMDAwMDAwMA==fc9c0e0f2d32fb440d1a3642614c44b5"
  );

  const downloadFile = () => {
    const itemData = {
      type: item.type,
      values: item.values,
    };

    console.log(itemData);

    const blob = new Blob([JSON.stringify(itemData)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.id}-${item.type}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (isEdit) {
      setContent(item.description);
    }
  }, [isEdit]);

  useEffect(() => {
    console.log(item);
    if (item.type === "candle-chart") {
      let data = [...item.values];
      console.log(data);

      setOptions({
        data: (item.values as any[]).map((item) => {
          // console.log({
          //   close: item.close,
          //   open: item.open,
          //   high: item.high,
          //   low: item.low,
          //   date: new Date(item.timestamp),
          // });
          return {
            close: item.close,
            open: item.open,
            high: item.high,
            low: item.low,
            date: new Date(item.timestamp * 1000),
            volume: 24,
          };
        }),
        background: {
          fill: theme?.color.chartBackground,
        },
        series: [
          {
            type: "candlestick",
            xKey: "date",
            lowKey: "low",
            highKey: "high",
            openKey: "open",
            closeKey: "close",
            xName: "Date",
            item: {
              up: {
                fill: "#5661F6",
                stroke: "#5661F6",
                strokeWidth: 0.79,
              },
              down: {
                fill: "#E1306C",
                stroke: "#E1306C",
                strokeWidth: 0.79,
              },
            },
          },
        ],
        axes: [
          {
            type: "number",
            position: "right",
            gridLine: {
              enabled: true,
              width: 0.37,
              style: [
                {
                  stroke: theme?.color.divider,
                  lineDash: [0],
                },
              ],
            },
          },
          {
            type: "ordinal-time",
            position: "bottom",
            line: {
              width: 1,
              color: isDarkMode ? "rgba(233, 233, 233, 0.5)" : "#E9E9E9",
            },
            gridLine: {
              enabled: true,
              width: 0.37,
              style: [
                {
                  stroke: theme?.color.divider,
                  lineDash: [0],
                },
              ],
            },
          },
        ],
      });
    } else if (item.type === "bar-chart") {
      setOptions({
        data: item.values as any[],
        background: {
          fill: theme?.color.chartBackground,
        },
        overlays: {
          loading: {
            text: "Some custom loading message",
          },
          noData: {
            text: "Some custom noData message",
          },
          noVisibleSeries: {
            text: "Some custom noVisibleSeries message",
          },
        },
        series: [
          {
            type: "bar",
            xKey: "label",
            yKey: "value",
            cornerRadius: 0,
            fill: "#5661F6",
            label: {
              fontSize: 10,
              color: "#5661F6",
            },
          },
        ],
        axes: [
          {
            type: "number",
            position: "right",
            line: {
              width: 1,
              color: isDarkMode ? "rgba(233, 233, 233, 0.5)" : "#E9E9E9",
            },
            gridLine: {
              style: [
                {
                  stroke: theme?.color.divider,
                  lineDash: [0],
                },
              ],
            },
          },
          {
            type: "category",
            position: "bottom",
            label: {
              fontSize: 10,
            },
            line: {
              width: 1,
              color: isDarkMode ? "rgba(233, 233, 233, 0.5)" : "#E9E9E9",
            },
            gridLine: {
              style: [
                {
                  stroke: theme?.color.divider,
                  lineDash: [0],
                },
              ],
            },
          },
        ],
      });
    } else if (item.type === "fan-chart") {
      setOptions({
        background: {
          fill: theme?.color.chartBackground,
        },
        data: (item.values as any[]).map((item) => {
          console.log({
            date: new Date(item.timestamp * 1000),
            value: item.central,
            low1: item.confidence_interval_50.lower
              ? item.confidence_interval_50.lower
              : item.central,
            low2: item.confidence_interval_75.lower
              ? item.confidence_interval_75.lower
              : item.central,
            low3: item.confidence_interval_90.lower
              ? item.confidence_interval_90.lower
              : item.central,
            high1: item.confidence_interval_50.upper
              ? item.confidence_interval_50.upper
              : item.central,
            high2: item.confidence_interval_75.upper
              ? item.confidence_interval_75.upper
              : item.central,
            high3: item.confidence_interval_90.upper
              ? item.confidence_interval_90.upper
              : item.central,
          });
          return {
            date: new Date(item.timestamp * 1000),
            value: item.central,
            low1: item.confidence_interval_50.lower
              ? item.confidence_interval_50.lower
              : item.central,
            low2: item.confidence_interval_75.lower
              ? item.confidence_interval_75.lower
              : item.central,
            low3: item.confidence_interval_90.lower
              ? item.confidence_interval_90.lower
              : item.central,
            high1: item.confidence_interval_50.upper
              ? item.confidence_interval_50.upper
              : item.central,
            high2: item.confidence_interval_75.upper
              ? item.confidence_interval_75.upper
              : item.central,
            high3: item.confidence_interval_90.upper
              ? item.confidence_interval_90.upper
              : item.central,
          };
        }),
        series: [
          {
            type: "range-area",
            xKey: "date",
            yLowKey: "low3",
            yHighKey: "high3",
            xName: "Date",
            yName: "confidence_interval_90",
            yLowName: "Low",
            yHighName: "High",
            fill: "#E1306C",
            strokeOpacity: 0,
            fillOpacity: 0.3,
          },
          {
            type: "range-area",
            xKey: "date",
            yLowKey: "low2",
            yHighKey: "high2",
            xName: "Date",
            yName: "confidence_interval_75",
            yLowName: "Low",
            yHighName: "High",
            fill: "#E1306C",
            strokeOpacity: 0,
            stroke: "#EA004F",
            fillOpacity: 0.4,
          },
          {
            type: "range-area",
            xKey: "date",
            yLowKey: "low1",
            yHighKey: "high1",
            xName: "Date",
            yName: "confidence_interval_50",
            yLowName: "Low",
            yHighName: "High",
            fill: "#E1306C",
            fillOpacity: 0.7,
            stroke: "#EA004F",
            strokeOpacity: 0,
            highlightStyle: {
              item: {
                fillOpacity: 0.7,
                fill: "#E1306C",
              },
            },
          },
          {
            type: "line",
            xKey: "date",
            yKey: "value",
            yName: "Central",
            marker: {
              enabled: false,
            },
            stroke: "#EA004F",
          },
        ],
        legend: {
          enabled: false,
        },
        axes: [
          {
            type: "ordinal-time",
            keys: ["date"],
            position: "bottom",
            line: {
              width: 1,
              color: isDarkMode ? "rgba(233, 233, 233, 0.5)" : "#E9E9E9",
            },
            gridLine: {
              style: [
                {
                  stroke: theme?.color.divider,
                  lineDash: [0],
                },
              ],
            },
          },
          {
            type: "number",
            position: "right",
            line: {
              width: 1,
              color: isDarkMode ? "rgba(233, 233, 233, 0.5)" : "#E9E9E9",
            },
            gridLine: {
              style: [
                {
                  stroke: theme?.color.divider,
                  lineDash: [0],
                },
              ],
            },
          },
        ],
      });
    }
  }, [isDarkMode]);

  function splitString(input: string) {
    const maxCharsPerLine = 8;
    const maxLines = 4;
    const result = [];

    // Split the input string into chunks of 8 characters
    for (let i = 0; i < input.length; i += maxCharsPerLine) {
      result.push(input.substring(i, i + maxCharsPerLine));
    }

    // Limit the result to a maximum of 4 lines
    return result.slice(0, maxLines).join("\n");
  }

  return (
    <S.BarChartWrapper
      ref={drag}
      onClick={(e) => {
        setPickRef(item);
        setPickIndex(index);
      }}
    >
      {isEdit ? (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <MDEditor
            data-color-mode={isDarkMode ? "dark" : "light"}
            height={400}
            style={{
              width: "100%",
            }}
            value={content}
            onChange={(e) => {
              setContent(e ?? "");
              setUpdateItems((i) => {
                const idx = i.findIndex(
                  (i) => i.type === "DESCRIPTION" && i.data.id === item.id
                );
                if (idx !== -1) {
                  const res = JSON.parse(JSON.stringify(i));
                  res[idx] = {
                    data: {
                      id: item.id,
                      description: e,
                      type: item.type,
                    },
                    type: "DESCRIPTION",
                  };
                  return res;
                } else {
                  return [
                    ...i,
                    {
                      data: {
                        id: item.id,
                        description: e,
                        type: item.type,
                      },
                      type: "DESCRIPTION",
                    },
                  ];
                }
              });
            }}
          />
        </div>
      ) : (
        <S.MarkdownTheme>
          <MarkdownPreview
            style={{ fontFamily: "Pretendard" }}
            wrapperElement={{
              "data-color-mode": "dark",
            }}
            source={item.description ? item.description : "NO CONTENTS"}
          />
        </S.MarkdownTheme>
      )}
      {options &&
        (item.type === "bar-chart" ||
          item.type === "candle-chart" ||
          item.type === "fan-chart") && (
          <S.BarChart
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <S.Cover
              onClick={() => {
                setPickRef(item);
                setPickIndex(index);
              }}
            />
            <AgChartsReact options={options} />
            <S.NodeOptionButton
              style={{ top: 10, right: 15 }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                downloadFile();
              }}
            >
              <Export fill={"black"} />
            </S.NodeOptionButton>
          </S.BarChart>
        )}
      {item.type === "causal-graph" && (
        <S.CausalChart
          isDarkMode={isDarkMode}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <S.Cover
            onClick={() => {
              setPickRef(item);
              setPickIndex(index);
            }}
          />
          <NodeGraph
            style={{
              height: "100%",
              background: theme?.color.chartBackground,
            }}
            options={{
              layout: {},
              edges: {
                color: theme?.color.white,
              },
              interaction: {
                zoomView: false,
                tooltipDelay: 0,
                navigationButtons: !isLoadingPDF,
              },
              manipulation: {
                enabled: false,
                // editNode: () => {},
                // initiallyActive: true,
              },
            }}
            graph={{
              nodes: (item.nodes as any[])
                .filter((review, idx) => {
                  return (
                    (item.nodes as any[]).findIndex((review1) => {
                      return review.id === review1.id;
                    }) === idx
                  );
                })
                .map((item) => {
                  return {
                    label: splitString(item.label as string),
                    id: item.id,
                    title: `${item.label}`,
                    color: {
                      border: "rgba(117, 117, 117, 1)",
                      background: theme?.color.white1,
                      highlight: {
                        border: "rgba(86, 97, 246, 1)",
                        background: "rgba(86, 97, 246, 1)",
                      },
                    },
                    shape: "circle",
                    margin: {
                      left: 20,
                      right: 20,
                    },
                    physics: true,
                    font: {
                      face: "IBMPlexMono-Regular",
                      size: 14,
                      color: theme?.color.black,
                    },
                    size: 30,
                    borderWidth: 2,
                  };
                }),
              edges: item.edges.map((item: any) => {
                return {
                  // label: item.label,
                  to: item.target,
                  from: item.source,
                  color: {
                    color: theme?.color.black,
                    highlight: "rgba(86, 97, 246, 1)",
                  },
                  font: {
                    face: "IBMPlexMono-Regular",
                    color: theme?.color.black,
                    strokeWidth: 0,
                  },
                  length: 500,
                  physics: false,
                };
              }),
            }}
          />
          <S.NodeOptionButton
            style={{ top: 10, right: 15 }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              downloadFile();
            }}
          >
            <Export fill={"black"} />
          </S.NodeOptionButton>
        </S.CausalChart>
      )}
    </S.BarChartWrapper>
  );
};

export default BarChart;
