import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    data: {
        task: [],
        completedTask: [],
        uncompletedTask: [],
        isLoading: false,
        isError: false
    },

};

let base_url = "http://localhost:3003/v1/todo/";

// Get data
export let fetchdata = createAsyncThunk("todoget",
    async ({ endpoint }, { rejectWithValue }) => {
        try {
            let response = await axios.get(base_url + endpoint);
            console.log("🚀 ~ response:", response);
            return { responsedata: response.data.result, endpoint };
        } catch (error) {
            console.log("🚀 ~ error:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Post data
export let postdata = createAsyncThunk("todoadd",
    async ({ endpoint, data }, { rejectWithValue }) => {
        console.log("🚀 ~ data:", data);
        try {
            let response = await axios.post(base_url + endpoint, data);
            console.log("🚀 ~ response:", response);
            return response.data.result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



//delete data
// delete Data
export const deleteData = createAsyncThunk(
    "deleteData",
    async (id, { rejectWithValue }) => {
        try {
            let response = await axios.delete(
                `${base_url}/deletetask/${id}`
            );
            console.log("🚀 ~ response from dededededededeeddeededdeededeedede:", response)
            return response.data.result;
        } catch (err) {
            return rejectWithValue(
                err.response ? err.response.data.message : err.message
            );
        }
    }
);;

let base_url_update = base_url + "updatetask/";
// Update Data
export const updateData = createAsyncThunk(
    "updateData",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            let res = await axios.put(
                `${base_url_update}${id}`,
                data
            );
            return res.data.body;
        } catch (err) {
            return rejectWithValue(
                err.response ? err.response.data.message : err.message
            );
        }
    }
);







const todoSlice = createSlice({
    name: "todo",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchdata.pending, (state) => {

                state.data.isLoading = true;
                state.data.isError = null;
            })
            .addCase(fetchdata.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ action:", action)
                state.data.isLoading = false;
                state.data.isError = null;
                const { responsedata, endpoint } = action.payload;
                console.log("🚀 ~ .addCase ~ responsedata:", responsedata)
                switch (endpoint) {
                    case "gettask":
                        state.data.task = responsedata;
                        break;
                    // case "gettaskstatuscomplete":
                    //     state.data.completedTask = responsedata;
                    //     break;
                    // case "gettaskstatusuncomplete":
                    //     state.data.uncompletedTask = responsedata;
                    //     break;
                    default:
                        break;
                }
            })
            .addCase(fetchdata.rejected, (state, action) => {
                state.data.isLoading = false;
                state.data.isError = action.payload;
            })
            .addCase(postdata.pending, (state) => {
                state.data.isLoading = true;
                state.data.isError = null;
            })
            .addCase(postdata.fulfilled, (state, action) => {
                console.log("🚀 ~ .addCase ~ action:", action);

                state.data.isLoading = false;
                state.data.task = state.data.task.concat(action.payload);
            })
            .addCase(postdata.rejected, (state, action) => {
                state.data.isError = action.payload;
                state.data.isLoading = false;
            })
            .addCase(updateData.pending, (state) => {
                state.data.isLoading = true;
                state.data.isError = false;
            })
            .addCase(updateData.fulfilled, (state, action) => {
                state.data.isLoading = false;

                state.data.task = state.data.task.map((todo) =>
                    todo._id == action.payload._id ? action.payload : todo
                );

            })
            .addCase(updateData.rejected, (state, action) => {
                state.data.isLoading = false;
                state.data.isError = action.payload;
            })

            .addCase(deleteData.pending, (state) => {
                state.data.isLoading = true;
                state.data.isError = false;
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.data.isLoading = false;
                state.data.task = state.data.task.filter(
                    (state) => state._id !== action.payload._id
                  );
            })

            .addCase(deleteData.rejected, (state, action) => {
                state.data.isLoading = false;
                state.data.isError = action.payload;
            })
    }
});

export default todoSlice.reducer;
