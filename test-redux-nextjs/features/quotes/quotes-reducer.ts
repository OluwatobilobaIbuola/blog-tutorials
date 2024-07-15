import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface QuotesState {
  quotes: Quote[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: QuotesState = {
  quotes: [],
  total: 0,
  loading: false,
  error: null,
};

const quotes = "quotes";

export const quotesSlice = createSlice({
  name: quotes,
  initialState,
  reducers: {
    fetchQuotesRequest: (state) => {
      state.loading = true;
    },
    fetchQuotesSuccess: (state, action: PayloadAction<QuotesApiResponse>) => {
      state.loading = false;
      state.quotes = action.payload.quotes;
      state.total = action.payload.total;
    },
    fetchQuotesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchQuotesRequest, fetchQuotesSuccess, fetchQuotesFailure } =
  quotesSlice.actions;

export const quotesReducer = quotesSlice.reducer;
