import React, { useEffect, useState } from "react";
import * as S from "../styles";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import MarkdownPreview from "@uiw/react-markdown-preview";
import NodeGraph from "react-vis-graph-wrapper";
import Chart from "react-apexcharts";
import { AgCharts } from "ag-charts-enterprise";
import { getData } from "./testData";
import { useDrag } from "react-dnd";

type Props = {
  item: any;
};

const BarChart = ({ item }: Props) => {
  const [options, setOptions] = useState<AgChartOptions>();

  const [{}, drag] = useDrag(() => ({
    type: "ITEM",
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  AgCharts.setLicenseKey("");

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
                  stroke: "#191919",
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
                  stroke: "#191919",
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
        background: {},
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
      });
    } else if (item.type === "fan-chart") {
      setOptions({
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
          },
          {
            type: "number",
            position: "right",
          },
        ],
      });
    }
  }, []);

  return (
    <S.BarChartWrapper>
      <div ref={drag}>
        <MarkdownPreview
          wrapperElement={{
            "data-color-mode": "light",
          }}
          source={item.description ? item.description : "NO CONTENTS"}
        />
      </div>
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
        <S.CausalChart>
          <S.Cover />
          <NodeGraph
            options={{
              layout: {
                // hierarchical: true,
              },
              edges: {
                color: "#000000",
              },
            }}
            graph={{
              nodes: (item.nodes as any[]).map((item) => {
                return {
                  label: item.label,
                  id: item.id,
                  title: `${item.value}`,
                };
              }),
              edges: item.edges.map((item: any) => {
                return {
                  label: item.label,
                  to: item.target,
                  from: item.source,
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
