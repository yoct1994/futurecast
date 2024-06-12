import { useContext, useEffect, useState } from "react";
import * as S from "../styles";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import MarkdownPreview from "@uiw/react-markdown-preview";
import NodeGraph from "react-vis-graph-wrapper";
import { AgCharts } from "ag-charts-enterprise";
import { useDrag } from "react-dnd";
import { useRecoilValue } from "recoil";
import { isDarkModeState } from "../../../recoil/recoil";
import { ThemeContext } from "styled-components";

type Props = {
  item: any;
  setPickRef: React.Dispatch<React.SetStateAction<any>>;
};

const BarChart = ({ item, setPickRef }: Props) => {
  const [options, setOptions] = useState<AgChartOptions>();
  const isDarkMode = useRecoilValue(isDarkModeState);
  const theme = useContext(ThemeContext);

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
            cornerRadius: 16,
            fill: "#5661F6",
            label: {
              fontSize: 10,
            },
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
            label: {
              fontSize: 10,
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

  return (
    <S.BarChartWrapper
      onClick={() => {
        setPickRef(item);
      }}
    >
      <div ref={drag}>
        <S.MarkdownTheme>
          <MarkdownPreview
            wrapperElement={{
              "data-color-mode": "light",
            }}
            source={item.description ? item.description : "NO CONTENTS"}
          />
        </S.MarkdownTheme>
      </div>
      {options &&
        (item.type === "bar-chart" ||
          item.type === "candle-chart" ||
          item.type === "fan-chart") && (
          <S.BarChart
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <AgChartsReact
              onChartReady={(chart) => {
                console.log("options", chart.getOptions());
              }}
              options={options}
            />
          </S.BarChart>
        )}
      {item.type === "causal-graph" && (
        <S.CausalChart>
          <S.Cover />
          <NodeGraph
            style={{
              height: "100%",
              background: theme?.color.chartBackground,
            }}
            options={{
              layout: {
                // hierarchical: true,
              },
              edges: {
                color: theme?.color.white,
              },
            }}
            graph={{
              nodes: (item.nodes as any[]).map((item) => {
                return {
                  label: item.label,
                  id: item.id,
                  title: `${item.value}`,
                  // color: theme?.color.black,
                };
              }),
              edges: item.edges.map((item: any) => {
                return {
                  label: item.label,
                  to: item.target,
                  from: item.source,
                  color: theme?.color.black,
                };
              }),
            }}
          />
        </S.CausalChart>
      )}
    </S.BarChartWrapper>
  );
};

export default BarChart;
