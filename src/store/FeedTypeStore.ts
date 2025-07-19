import { create } from "zustand";

type FeedType = "All" | "Trending" | "Following";

interface FeedTypeStore {
  feedType: FeedType;
  setFeedType: (feedType: FeedType) => void;
}

const useFeedTypeStore = create<FeedTypeStore>((set) => ({
  feedType: "All",
  setFeedType: (feedType) => set({ feedType }),
}));

export default useFeedTypeStore;
