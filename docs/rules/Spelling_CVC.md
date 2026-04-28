# Подвоєння приголосних (Consonant Doubling - CVC)

Цей алгоритм пояснює, коли остання літера слова подвоюється при додаванні закінчень (наприклад, `-ing`, `-ed`).

### Алгоритм «Три Так» (The "Three Yes" Algorithm)
Щоб літера подвоїлася, слово має отримати **три ствердні відповіді** на наступні запитання:

1.  **Чи закінчується слово на CVC? (Does it end in CVC?)**
    * CVC = **C**onsonant — One **V**owel — **C**onsonant (Приголосна — Одна Голосна — Одна Приголосна).
    * *Examples:* `s-t-o-p` (t-o-p is CVC) — **YES**. `r-e-a-d` — **NO** (two vowels). `h-e-l-p` — **NO** (two consonants at the end).

2.  **Чи падає наголос на цей склад? (Is the syllable stressed?)**
    * Якщо слово коротке (один склад), відповідь завжди «ТАК».
    * Якщо слово довге, наголос має бути **на останньому складі**.
    * *Examples:* `be-GIN` — **YES** (begin**n**ing). `O-pen` — **NO** (open**i**ng).

3.  **Чи це «безпечна» приголосна? (Is it a "safe" consonant?)**
    * Остання літера **НЕ** повинна бути **w, x** або **y**.
    * *Examples:* `low` — **NO**. `fix` — **NO**. `play` — **NO**.

---

### Винятки та нюанси (Exceptions and Nuances)

1.  **Заборонені літери (Forbidden Letters):** **w, x, y** ніколи не подвоюються.
2.  **Дві голосні (Double Vowels):** Якщо перед приголосною стоять дві голосні підряд (ee, ea, oo, ai), подвоєння не відбувається.
    * *keep → keeping*, *wait → waiting*.
3.  **Британська англійська (British English):**
    Дієслова на **-l** (наприклад, `travel`) в Британії подвоюють завжди (`travelling`), навіть якщо наголос на початку. В США вони підкорюються загальному правилу.

### Як це працює в грі (In-Game Examples)
* `stop + ing` → **stopping** (CVC + Stress + Safe) — **YES**.
* `mix + ing` → **mixing** (Ends in X) — **NO**.
* `visit + ing` → **visiting** (Stress is on the first syllable: VI-sit) — **NO**.
