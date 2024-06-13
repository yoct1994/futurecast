import React, { useContext, useEffect, useState } from "react";
import * as S from "./styles";
import { ReactComponent as Close } from "../../../assets/Close.svg";
import { ThemeContext } from "styled-components";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { MarkdownTheme } from "../styles";
import { isDarkModeState } from "../../../recoil/recoil";
import { useRecoilValue } from "recoil";
import { AgChartsReact } from "ag-charts-react";
import NodeGraph from "react-vis-graph-wrapper";
import { deepClone } from "ag-charts-community/dist/types/src/module-support";
import { AgChartOptions } from "ag-charts-community";
import { AgCharts } from "ag-charts-enterprise";
import { ReactComponent as Edit } from "../../../assets/document_page/Edit.svg";
import { ReactComponent as Add } from "../../../assets/document_page/Add.svg";

type Props = {
  item: any;
  setPickRef: React.Dispatch<React.SetStateAction<any>>;
};

const ReferencePopup = ({ item, setPickRef }: Props) => {
  const [options, setOptions] = useState<AgChartOptions>();
  const isDarkMode = useRecoilValue(isDarkModeState);
  const theme = useContext(ThemeContext);

  const [controll, setControll] = useState<string>("1D");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  AgCharts.setLicenseKey(
    "Using_this_{AG_Charts}_Enterprise_key_{AG-061368}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{LG_AI_Research}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{timeseries_forecasting}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{timeseries_forecasting}_need_to_be_licensed___{timeseries_forecasting}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Charts}_Enterprise_versions_released_before_{10_June_2025}____[v3]_[02]_MTc0OTUxMDAwMDAwMA==fc9c0e0f2d32fb440d1a3642614c44b5"
  );

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
            date: new Date(item.timestamp),
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
        zoom: {
          enableAxisDragging: false,
          enablePanning: true,
          enableScrolling: true,
          enableSelecting: false,
        },
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
            cornerRadius: 8,
            fill: "#5661F6",
          },
        ],
        axes: [
          {
            type: "number",
            position: "right",
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
            date: new Date(item.timestamp),
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
            date: new Date(item.timestamp),
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
        zoom: {
          enabled: true,
        },
        axes: [
          {
            type: "ordinal-time",
            position: "bottom",
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

  useEffect(() => {
    if (options) {
      const clone = options;
      if (clone && clone.zoom) {
        const startDate = new Date(item.values[0].timestamp);
        const endDate = new Date(item.values[item.values.length - 1].timestamp);

        switch (controll) {
          case "1D":
            clone.zoom.rangeX = {
              start: endDate.setDate(endDate.getDate() - 1),
              end: undefined,
            };
            break;
          case "5D":
            clone.zoom.rangeX = {
              start: endDate.setDate(endDate.getDate() - 5),
              end: undefined,
            };
            break;
          case "1M":
            clone.zoom.rangeX = {
              start: endDate.setMonth(endDate.getMonth() - 1),
              end: undefined,
            };
            break;
          case "6M":
            clone.zoom.rangeX = {
              start: endDate.setMonth(endDate.getMonth() - 6),
              end: undefined,
            };
            break;
          case "YTD":
            break;
          case "1Y":
            clone.zoom.rangeX = {
              start: endDate.setMonth(endDate.getMonth() - 12),
              end: undefined,
            };
            break;
          case "5Y":
            clone.zoom.rangeX = {
              start: endDate.setMonth(endDate.getMonth() - 60),
              end: undefined,
            };
            break;
          case "All":
            clone.zoom.rangeX = {
              start: startDate,
              end: endDate,
            };
            break;
        }
      }
    }
  }, [controll]);

  return (
    <S.ReferencePopupWrapper>
      <S.ReferencePopupContainer>
        <S.ReferencePopupHeaderWrapper>
          <Close
            style={{
              cursor: "pointer",
            }}
            fill={theme?.color.black}
            onClick={(e) => {
              // e.stopPropagation();
              setPickRef(null);
            }}
          />
        </S.ReferencePopupHeaderWrapper>
        <S.MarkdownTheme>
          <MarkdownPreview
            wrapperElement={{
              "data-color-mode": "light",
            }}
            source={item.description ? item.description : "NO CONTENTS"}
          />
        </S.MarkdownTheme>
        {options &&
          (item.type === "bar-chart" ||
            item.type === "candle-chart" ||
            item.type === "fan-chart") && (
            <S.BarChart>
              <AgChartsReact
                onChartReady={(chart) => {
                  console.log("options", chart.getOptions());
                }}
                options={options}
              />
            </S.BarChart>
          )}
        {item.type === "causal-graph" && (
          <S.CausalChart isDarkMode={isDarkMode}>
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
                  navigationButtons: true,
                },
                manipulation: {
                  enabled: isEdit,
                  editNode: () => {},
                  initiallyActive: true,
                },
              }}
              graph={{
                nodes: (item.nodes as any[]).map((item) => {
                  return {
                    label: item.label,
                    id: item.id,
                    title: `${item.value}`,
                    color: {
                      border: "rgba(86, 97, 246, 1)",
                      background: theme?.color.white1,
                      highlight: {
                        border: "rgba(86, 97, 246, 1)",
                        background: "rgba(86, 97, 246, 1)",
                      },
                    },
                    shape: "circle",
                    margin: {
                      left: 10,
                      right: 10,
                    },
                    physics: true,
                    font: {
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
                      color: theme?.color.black,
                      strokeWidth: 0,
                    },
                    length: 200,
                    physics: true,
                  };
                }),
              }}
            />
            <S.ChartEditButton
              onClick={(e) => {
                if (isEdit) {
                }

                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? <Add /> : <Edit />}
              <S.ChartEditText>{isEdit ? "SAVE" : "EDIT"}</S.ChartEditText>
            </S.ChartEditButton>
          </S.CausalChart>
        )}
        {item.type === "candle-chart" && (
          <S.ChartControllerWrapper>
            <S.ChartController>
              <S.ControllButton
                select={controll === "1D"}
                onClick={() => {
                  setControll("1D");
                }}
              >
                1D
              </S.ControllButton>
              <S.Divider />
              <S.ControllButton
                select={controll === "5D"}
                onClick={() => {
                  setControll("5D");
                }}
              >
                5D
              </S.ControllButton>
              <S.Divider />
              <S.ControllButton
                select={controll === "1M"}
                onClick={() => {
                  setControll("1M");
                }}
              >
                1M
              </S.ControllButton>
              <S.Divider />
              <S.ControllButton
                select={controll === "6M"}
                onClick={() => {
                  setControll("6M");
                }}
              >
                6M
              </S.ControllButton>
              <S.Divider />
              <S.ControllButton
                select={controll === "YTD"}
                onClick={() => {
                  setControll("YTD");
                }}
              >
                YTD
              </S.ControllButton>
              <S.Divider />
              <S.ControllButton
                select={controll === "1Y"}
                onClick={() => {
                  setControll("1Y");
                }}
              >
                1Y
              </S.ControllButton>
              <S.Divider />
              <S.ControllButton
                select={controll === "5Y"}
                onClick={() => {
                  setControll("5Y");
                }}
              >
                5Y
              </S.ControllButton>
              <S.Divider />
              <S.ControllButton
                select={controll === "All"}
                onClick={() => {
                  setControll("All");
                }}
              >
                All
              </S.ControllButton>
            </S.ChartController>
          </S.ChartControllerWrapper>
        )}
      </S.ReferencePopupContainer>
    </S.ReferencePopupWrapper>
  );
};

export default ReferencePopup;
