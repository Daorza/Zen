import { useEffect, useState } from "react";

const simpleCache = new Map();

export function useFetch(fn, key = null, ttl = 30) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (key && simpleCache.has(key)) {
            const cached = simpleCache.get(key);
            if (Date.now() - cached.timestamp < ttl) {
                setData(cached.data);
                setLoading(false);
                return;
            }
        }

        fn()
            .then((res) => {
                if (key) {
                    simpleCache.set(key, { data: res, timestamp: Date.now() });
                }
                setData(res);
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}
