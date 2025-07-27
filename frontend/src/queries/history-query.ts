import { historyAPI } from "@/services/API/historyService";

export function getHistoryQueryOptions() {
    return {
        queryKey: ["history"] as const,
        queryFn: () => historyAPI.getHistory(),
    };
}
