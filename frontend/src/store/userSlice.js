import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../api/client";

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  xp: 0,
  points: 0,
  quizzesCompleted: 0,
  streak: 0,
  claimedPrizes: [],
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get("/api/user/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch profile"
      );
    }
  }
);

export const redeemPrize = createAsyncThunk(
  "user/redeemPrize",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await client.post(
        "/api/user/redeem",
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Redemption failed"
      );
    }
  }
);

export const submitQuizScore = createAsyncThunk(
  "user/submitQuizScore",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await client.post(
        `/api/quizzes/${payload.quizId}/submit`,
        {
          score: payload.score,
          totalQuestions: payload.totalQuestions,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to submit score"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload;

      if (!user) {
        state.email = null;
        state.firstName = null;
        state.lastName = null;
        state.xp = 0;
        state.points = 0;
        state.streak = 0;
        state.claimedPrizes = [];
        return;
      }

      state.email = user.email;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.xp = user.xp || 0;
      state.points = user.points || 0;
      state.streak = user.streak || 0;
      state.claimedPrizes = user.claimedPrizes || [];
    },

    clearUser(state) {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.xp = 0;
      state.points = 0;
      state.streak = 0;
      state.claimedPrizes = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      const user = action.payload;
      state.loading = false;
      state.email = user.email;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.xp = user.xp || 0;
      state.points = user.points || 0;
      state.quizzesCompleted = user.quizzesCompleted || 0;
      state.streak = user.streak || 0;
      state.claimedPrizes = (user.claimedPrizes || []).map((p) => ({
        ...p,
        date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      }));
    });

    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(redeemPrize.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(redeemPrize.fulfilled, (state, action) => {
      state.loading = false;
      state.points = action.payload.points;
      state.claimedPrizes = (action.payload.claimedPrizes || []).map((p) => ({
        ...p,
        date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      }));
    });

    builder.addCase(redeemPrize.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(submitQuizScore.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(submitQuizScore.fulfilled, (state, action) => {
      state.loading = false;
      state.xp = action.payload.newXp;
      state.points = action.payload.newPoints;
      state.streak = action.payload.streak;
    });

    builder.addCase(submitQuizScore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;