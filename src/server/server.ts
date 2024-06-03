import axios, { Axios } from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const server = new Axios({
  baseURL: `http://api.futurecastai.com:8888/v1/document-manager`,
});

const getToken = () => {
  const token = cookies.get(`TOKEN`);
  console.log("API 요청 : ", token);
  return token;
};

export const getNavBar = async () => {
  return await server.get(`/nav/left`, {
    headers: {
      token: getToken(),
    },
  });
};

export const getSuggetion = async (query: string) => {
  return await server.get("/datastore/lair-id/search", {
    params: {
      query: query,
      n: 100,
    },
    headers: {
      token: getToken(),
    },
  });
};

export const getExampleQueries = async () => {
  return await server.get("/futurecast/prompt/examples", {
    headers: {
      token: getToken(),
    },
  });
};

export const getDocument = async (pageId: string) => {
  return await server.get(`/page/${pageId}`, {
    headers: {
      token: getToken(),
    },
  });
};

export const getDocumentTreeData = async (pageId: string) => {
  return await server.get(`/page/${pageId}/breadcrumb`, {
    headers: {
      token: getToken(),
    },
  });
};

export const getDocumentInfo = async (documentId: string) => {
  return await server.get(`/document/${documentId}`, {
    headers: {
      token: getToken(),
    },
  });
};

export const getReferences = async (type: string, referenceId: string) => {
  return await server.get(`/reference/${type}/${referenceId}`, {
    headers: {
      token: getToken(),
    },
  });
};

export const moveCollectionItem = async (
  collection_id: string,
  page_id: string
) => {
  return await server.post(
    `/collection/${collection_id}/page/${page_id}`,
    {},
    {
      headers: {
        token: getToken(),
      },
    }
  );
};
// /collection/
export const makeCollection = async (collectionName: string) => {
  return await server.post(`/collection/`, collectionName, {
    headers: {
      token: getToken(),
    },
  });
};

export const deletePage = async (page_id: string) => {
  return await server.delete(`/page/${page_id}`, {
    headers: {
      token: getToken(),
    },
  });
};

export const makePage = async (fullText: string, mentions: any[]) => {
  console.log({
    full_text: fullText,
    mentions: mentions,
  });
  console.log(
    JSON.stringify({
      full_text: fullText,
      mentions: mentions,
    })
  );

  const data = {
    full_text: fullText,
    mentions: mentions,
  };

  return await server.post(`/page/root`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
  });
};

export const makeNewDocument = async (
  page_id: string,
  fullText: string,
  mentions: any[]
) => {
  console.log({
    full_text: fullText,
    mentions: mentions,
  });
  console.log(
    JSON.stringify({
      full_text: fullText,
      mentions: mentions,
    })
  );

  const data = {
    full_text: fullText,
    mentions: mentions,
  };

  return await server.post(`/document/${page_id}`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
  });
};

export const generateAI = async (
  document_id: string,
  reference_addresses: any[]
) => {
  return await server.post(
    `/document/${document_id}/generate`,
    JSON.stringify({
      reference_addresses: reference_addresses,
      planner_search_depth: 1,
      planner_max_tokens: 2048,
      planner_temperature: 0.9,
      planner_top_p: 1,
    }),
    {
      headers: {
        token: getToken(),
        "Content-Type": "application/json",
      },
    }
  );
};
