export default {
  control: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    // fontWeight: 'normal',
    width: "calc(100% - 4px)",
    border: "none",
    boxSizing: "border-box",
  },

  "&multiLine": {
    control: {
      minHeight: "55px",
    },
    highlighter: {
      paddingLeft: "32px",
      paddingRight: "64px",
    },
    input: {
      padding: 9,
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,

    highlighter: {
      padding: 1,
    },
    input: {
      padding: 1,
    },
  },

  suggestions: {
    list: {
      backgroundColor: "${({theme}) => theme.color.white}",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 16,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};
