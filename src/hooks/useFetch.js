import { useEffect, useState } from "react";

export function useFetch(fn) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fn().then(setData).catch(setError).finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}
