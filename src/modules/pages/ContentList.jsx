import React, { useEffect, useState } from "react";
import api from "../../lib/api";

export default function ContentList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await api.get("/api/content");
      const list = res.data?.data || res.data || [];
      setItems(Array.isArray(list) ? list : (list?.rows || []));
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((c) => (
        <article key={c.id} className="rounded-2xl bg-white/5 p-4 border border-white/10">
          <h3 className="font-bold text-lg mb-2">{c.title || c.name || `محتوا #${c.id}`}</h3>
          <p className="text-sm text-white/70 mb-3">{c.category || c.content_type || "عمومی"}</p>
          <button className="px-3 py-1.5 rounded-xl bg-primary/70">مشاهده</button>
        </article>
      ))}
    </section>
  );
}
