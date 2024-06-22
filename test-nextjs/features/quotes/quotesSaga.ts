import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchQuotesFailure,
  fetchQuotesRequest,
  fetchQuotesSuccess,
} from "./quotesApiSlice";

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface QuotesApiResponse {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
}

const fetchQuotesApi = async (limit: number): Promise<QuotesApiResponse> => {
  const response = await fetch(`https://dummyjson.com/quotes?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch quotes");
  }
  return await response.json();
};

function* fetchQuotesSaga() {
  try {
    const quotes: QuotesApiResponse = yield call(fetchQuotesApi, 10);
    yield put(fetchQuotesSuccess(quotes));
  } catch (error: any) {
    yield put(fetchQuotesFailure(error.toString()));
  }
}

export function* watchFetchQuotesSaga() {
  yield takeLatest(fetchQuotesRequest.type, fetchQuotesSaga);
}
