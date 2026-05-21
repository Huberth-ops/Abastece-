import { useState } from "react";

const COLORS = {
  primary: "#FF6B00",
  primaryDark: "#CC5500",
  secondary: "#1A1A2E",
  accent: "#FFD700",
  bg: "#F5F5F0",
  card: "#FFFFFF",
  text: "#1A1A2E",
  muted: "#6B7280",
  success: "#10B981",
  bronze: "#CD7F32",
  silver: "#A8A9AD",
  gold: "#FFD700",
};

const initialUsers = [
  {
    id: 1,
    name: "Nathan Henrique",
    phone: "38999990001",
    points: 24,
    credits: 0,
    level: "Bronze",
    history: [
      {
        id: 1,
        posto: "AbasteCerto - Centro",
        value: 150,
        points: 24,
        date: "20/05/2026",
        liters: 25,
        fuel: "Gasolina Comum",
      },
    ],
  },
];

function getLevel(points) {
  if (points >= 1500) return "Ouro";
  if (points >= 500) return "Prata";
  return "Bronze";
}

function getLevelColor(level) {
  if (level === "Ouro") return COLORS.gold;
  if (level === "Prata") return COLORS.silver;
  return COLORS.bronze;
}

function getLevelNext(level) {
  if (level === "Bronze") return { next: "Prata", threshold: 500 };
  if (level === "Prata") return { next: "Ouro", threshold: 1500 };
  return { next: "Ouro", threshold: 1500 };
}

// ─── LOGIN ───────────────────────────────────────────────
function LoginScreen({ onLogin, onRegister }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) {
      setError("Digite um telefone válido");
      return;
    }
    onLogin(clean);
    setError("");
  }

  return (
    <div style={styles.screen}>
      <div style={styles.loginHeader}>
        <div style={styles.logoWrap}>
          <span style={styles.logoIcon}>⛽</span>
          <span style={styles.logoText}>AbasteCerto</span>
        </div>
        <p style={styles.logoSub}>Seu clube de vantagens no posto</p>
      </div>

      <div style={styles.loginCard}>
        <h2 style={styles.loginTitle}>Entrar</h2>
        <p style={styles.loginDesc}>Digite seu telefone cadastrado</p>
        <input
          style={styles.input}
          placeholder="(38) 99999-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          maxLength={15}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.btnPrimary} onClick={handleLogin}>
          Entrar
        </button>
        <button style={styles.btnGhost} onClick={onRegister}>
          Não tenho cadastro → Criar conta
        </button>
      </div>

      <p style={styles.demoHint}>
        📱 Teste: use o telefone <strong>38999990001</strong>
      </p>
    </div>
  );
}

// ─── CADASTRO ────────────────────────────────────────────
function RegisterScreen({ onBack, onCreated }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleCreate() {
    if (!name.trim()) {
      setError("Digite seu nome");
      return;
    }
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) {
      setError("Digite um telefone válido");
      return;
    }
    onCreated({ name, phone: clean });
  }

  return (
    <div style={styles.screen}>
      <div style={styles.loginHeader}>
        <div style={styles.logoWrap}>
          <span style={styles.logoIcon}>⛽</span>
          <span style={styles.logoText}>AbasteCerto</span>
        </div>
      </div>
      <div style={styles.loginCard}>
        <button style={styles.backBtn} onClick={onBack}>
          ← Voltar
        </button>
        <h2 style={styles.loginTitle}>Criar conta</h2>
        <input
          style={styles.input}
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Telefone (38) 99999-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
        />
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.btnPrimary} onClick={handleCreate}>
          Criar conta
        </button>
      </div>
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────
function HomeScreen({ user, onNavigate }) {
  const level = getLevel(user.points);
  const { next, threshold } = getLevelNext(level);
  const progress = Math.min((user.points / threshold) * 100, 100);
  const missing = Math.max(threshold - user.points, 0);

  return (
    <div style={styles.pageScroll}>
      <div style={styles.homeHeader}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>
            Olá,
          </p>
          <h2 style={{ color: "#fff", margin: 0, fontSize: 20, fontWeight: 700 }}>
            {user.name}
          </h2>
        </div>
        <div style={styles.headerLogo}>⛽</div>
      </div>

      {/* Banner */}
      <div style={styles.benefitBanner}>
        <div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", margin: "0 0 2px" }}>
            ✨ Descontos exclusivos
          </p>
          <p style={{ fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>
            Você tem benefícios ativos
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", margin: 0 }}>
            Apresente seu código ao abastecer
          </p>
        </div>
        <div style={{ ...styles.levelBadge, background: getLevelColor(level) }}>
          <span style={{ fontSize: 22 }}>🏅</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{level}</span>
        </div>
      </div>

      {/* Carteira */}
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>👛</span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Minha Carteira</span>
          </div>
          <button style={styles.btnSmall} onClick={() => onNavigate("abastecer")}>
            + Registrar
          </button>
        </div>
        <div style={styles.walletRow}>
          <div style={styles.walletItem}>
            <span style={{ fontSize: 22 }}>⭐</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.text }}>{user.points}</span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Pontos</span>
          </div>
          <div style={styles.walletItem}>
            <span style={{ fontSize: 22 }}>💳</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.text }}>
              R$ {user.credits.toFixed(2)}
            </span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Crédito</span>
          </div>
          <div style={styles.walletItem}>
            <span style={{ fontSize: 22 }}>📈</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.success }}>
              R$ 0,00
            </span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Economia</span>
          </div>
        </div>
        <p style={{ fontSize: 11, color: COLORS.muted, textAlign: "center", margin: "8px 0 0" }}>
          🚀 Abasteça, acumule pontos e suba de nível!
        </p>
      </div>

      {/* Nível */}
      <div style={styles.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 20 }}>🏆</span>
          <div>
            <p style={{ fontSize: 11, color: COLORS.muted, margin: 0 }}>Seu nível</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: getLevelColor(level), margin: 0 }}>
              {level.toUpperCase()}
            </p>
          </div>
        </div>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress}%`,
              background: getLevelColor(level),
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 11, color: COLORS.muted }}>{level.toLowerCase()}</span>
          <span style={{ fontSize: 11, color: COLORS.muted }}>{next.toLowerCase()}</span>
        </div>
        {missing > 0 && (
          <p style={{ fontSize: 12, color: COLORS.muted, marginTop: 6 }}>
            Faltam <strong>{missing} pts</strong> para {next}
          </p>
        )}
      </div>

      {/* Abastecimentos recentes */}
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <p style={{ fontWeight: 700, color: COLORS.primary, fontSize: 13, margin: 0 }}>
            ⛽ SEUS ABASTECIMENTOS
          </p>
          <button style={styles.linkBtn} onClick={() => onNavigate("historico")}>
            Ver todos →
          </button>
        </div>
        {user.history.length === 0 && (
          <p style={{ fontSize: 13, color: COLORS.muted, textAlign: "center" }}>
            Nenhum abastecimento ainda
          </p>
        )}
        {[...user.history].reverse().slice(0, 2).map((h) => (
          <div key={h.id} style={styles.historyItem}>
            <span style={{ fontSize: 24 }}>⛽</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{h.posto}</p>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.success }}>+{h.points} pontos</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>R$ {h.value.toFixed(2)}</p>
              <p style={{ margin: 0, fontSize: 11, color: COLORS.muted }}>{h.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Promoções */}
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>✨ Promoções</p>
          <span style={{ fontSize: 18 }}>›</span>
        </div>
        <p style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>
          Nenhuma promoção ativa no momento
        </p>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}

// ─── ABASTECER ───────────────────────────────────────────
function AbastecerScreen({ onRegistered }) {
  const [value, setValue] = useState("");
  const [liters, setLiters] = useState("");
  const [fuel, setFuel] = useState("Gasolina Comum");
  const [posto, setPosto] = useState("AbasteCerto - Centro");
  const [success, setSuccess] = useState(false);
  const [earned, setEarned] = useState(0);

  const fuels = ["Gasolina Comum", "Gasolina Aditivada", "Etanol", "Diesel"];
  const postos = [
    "AbasteCerto - Centro",
    "AbasteCerto - Norte",
    "AbasteCerto - Sul",
  ];

  function handleRegister() {
    const v = parseFloat(value.replace(",", "."));
    if (!v || v <= 0) return;
    const pts = Math.floor(v / 5);
    setEarned(pts);
    onRegistered({
      value: v,
      liters: parseFloat(liters) || 0,
      fuel,
      posto,
      points: pts,
    });
    setSuccess(true);
  }

  if (success) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          minHeight: "70vh",
        }}
      >
        <div style={styles.successIcon}>✅</div>
        <h2 style={{ color: COLORS.text, textAlign: "center", marginBottom: 16 }}>
          Abastecimento registrado!
        </h2>
        <div style={styles.earnedCard}>
          <p style={{ fontSize: 13, color: COLORS.muted, margin: "0 0 4px" }}>Você ganhou</p>
          <p style={{ fontSize: 48, fontWeight: 900, color: COLORS.primary, margin: 0 }}>
            +{earned}
          </p>
          <p style={{ fontSize: 16, color: COLORS.muted, margin: 0 }}>pontos</p>
        </div>
        <button
          style={{ ...styles.btnPrimary, marginTop: 24, maxWidth: 300 }}
          onClick={() => {
            setSuccess(false);
            setValue("");
            setLiters("");
          }}
        >
          Registrar outro
        </button>
      </div>
    );
  }

  const estimatedPts = value
    ? Math.floor(parseFloat(value.replace(",", ".") || 0) / 5)
    : 0;

  return (
    <div style={styles.pageScroll}>
      <div style={styles.screenHeader}>
        <h2 style={styles.screenTitle}>⛽ Registrar Abastecimento</h2>
        <p style={styles.screenSub}>Preencha os dados do seu abastecimento</p>
      </div>

      <div style={styles.card}>
        <label style={styles.label}>Posto</label>
        <select
          style={styles.select}
          value={posto}
          onChange={(e) => setPosto(e.target.value)}
        >
          {postos.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <label style={styles.label}>Combustível</label>
        <select
          style={styles.select}
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
        >
          {fuels.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>

        <label style={styles.label}>Valor pago (R$)</label>
        <input
          style={styles.input}
          type="number"
          placeholder="Ex: 150.00"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <label style={styles.label}>Litros abastecidos (opcional)</label>
        <input
          style={styles.input}
          type="number"
          placeholder="Ex: 25"
          value={liters}
          onChange={(e) => setLiters(e.target.value)}
        />

        <div style={styles.pointsPreview}>
          <span style={{ fontSize: 13, color: COLORS.muted }}>Pontos estimados:</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.primary }}>
            +{estimatedPts} pts
          </span>
        </div>

        <p style={{ fontSize: 11, color: COLORS.muted, textAlign: "center", marginBottom: 16 }}>
          Regra: 1 ponto a cada R$ 5,00 abastecidos
        </p>

        <button style={styles.btnPrimary} onClick={handleRegister}>
          Confirmar abastecimento
        </button>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}

// ─── HISTÓRICO ───────────────────────────────────────────
function HistoricoScreen({ user }) {
  const total = user.history.reduce((a, h) => a + h.value, 0);
  const totalPts = user.history.reduce((a, h) => a + h.points, 0);

  return (
    <div style={styles.pageScroll}>
      <div style={styles.screenHeader}>
        <h2 style={styles.screenTitle}>📋 Histórico</h2>
        <p style={styles.screenSub}>Todos os seus abastecimentos</p>
      </div>

      {user.history.length > 0 && (
        <div style={{ ...styles.card, display: "flex", justifyContent: "space-around" }}>
          <div style={styles.walletItem}>
            <span style={{ fontSize: 18, fontWeight: 800 }}>{user.history.length}</span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Abastec.</span>
          </div>
          <div style={styles.walletItem}>
            <span style={{ fontSize: 18, fontWeight: 800 }}>R$ {total.toFixed(2)}</span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Total gasto</span>
          </div>
          <div style={styles.walletItem}>
            <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.primary }}>
              {totalPts} pts
            </span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Acumulados</span>
          </div>
        </div>
      )}

      {user.history.length === 0 && (
        <div style={styles.card}>
          <p style={{ textAlign: "center", color: COLORS.muted }}>
            Nenhum abastecimento registrado
          </p>
        </div>
      )}

      {[...user.history].reverse().map((h) => (
        <div key={h.id} style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 30 }}>⛽</span>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>{h.posto}</p>
                {h.fuel && (
                  <p style={{ margin: 0, fontSize: 12, color: COLORS.muted }}>{h.fuel}</p>
                )}
                {h.liters > 0 && (
                  <p style={{ margin: 0, fontSize: 12, color: COLORS.muted }}>
                    {h.liters}L abastecidos
                  </p>
                )}
                <p style={{ margin: "4px 0 0", fontSize: 13, color: COLORS.success, fontWeight: 600 }}>
                  +{h.points} pontos
                </p>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 16 }}>
                R$ {h.value.toFixed(2)}
              </p>
              <p style={{ margin: 0, fontSize: 11, color: COLORS.muted }}>{h.date}</p>
            </div>
          </div>
        </div>
      ))}

      <div style={{ height: 80 }} />
    </div>
  );
}

// ─── PERFIL ──────────────────────────────────────────────
function PerfilScreen({ user, onLogout }) {
  const level = getLevel(user.points);

  return (
    <div style={styles.pageScroll}>
      <div style={styles.screenHeader}>
        <h2 style={styles.screenTitle}>👤 Perfil</h2>
      </div>

      <div style={styles.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div style={styles.avatar}>
            <span style={{ fontSize: 28, color: "#fff" }}>
              {user.name[0].toUpperCase()}
            </span>
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>{user.name}</p>
            <p style={{ margin: 0, fontSize: 13, color: COLORS.muted }}>📞 {user.phone}</p>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: getLevelColor(level) }}>
              🏅 {level}
            </p>
          </div>
        </div>
        <div style={styles.statsRow}>
          <div style={styles.statItem}>
            <span style={{ fontSize: 20, fontWeight: 800 }}>{user.points}</span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Pontos</span>
          </div>
          <div style={styles.statItem}>
            <span style={{ fontSize: 20, fontWeight: 800 }}>{user.history.length}</span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Abastec.</span>
          </div>
          <div style={styles.statItem}>
            <span style={{ fontSize: 20, fontWeight: 800 }}>
              R$ {user.history.reduce((a, h) => a + h.value, 0).toFixed(0)}
            </span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>Total gasto</span>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <p style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>
          📋 Regras do programa
        </p>
        <p style={{ fontSize: 13, color: COLORS.muted, margin: "0 0 8px" }}>
          🟠 1 ponto a cada R$ 5,00 abastecidos
        </p>
        <p style={{ fontSize: 13, color: COLORS.muted, margin: "0 0 8px" }}>
          🥈 Nível Prata: 500 pontos
        </p>
        <p style={{ fontSize: 13, color: COLORS.muted, margin: "0 0 8px" }}>
          🥇 Nível Ouro: 1.500 pontos
        </p>
        <p style={{ fontSize: 13, color: COLORS.muted }}>
          💰 Nível Ouro = 3% de desconto nos abastecimentos
        </p>
      </div>

      <div style={{ padding: "0 16px" }}>
        <button
          style={{ ...styles.btnPrimary, background: "#ef4444" }}
          onClick={onLogout}
        >
          Sair da conta
        </button>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}

// ─── APP PRINCIPAL ───────────────────────────────────────
export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [screen, setScreen] = useState("login");
  const [tab, setTab] = useState("home");

  function handleLogin(phone) {
    const user = users.find((u) => u.phone === phone);
    if (!user) {
      alert("Telefone não encontrado. Crie uma conta!");
      return;
    }
    setCurrentUser(user);
    setScreen("main");
    setTab("home");
  }

  function handleRegister({ name, phone }) {
    const exists = users.find((u) => u.phone === phone);
    if (exists) {
      alert("Telefone já cadastrado! Faça login.");
      return;
    }
    const newUser = {
      id: Date.now(),
      name,
      phone,
      points: 0,
      credits: 0,
      level: "Bronze",
      history: [],
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setScreen("main");
    setTab("home");
  }

  function handleRegistered(data) {
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;

    const newEntry = {
      id: Date.now(),
      posto: data.posto,
      value: data.value,
      liters: data.liters,
      fuel: data.fuel,
      points: data.points,
      date: dateStr,
    };

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== currentUser.id) return u;
        const updated = {
          ...u,
          points: u.points + data.points,
          history: [...u.history, newEntry],
        };
        setCurrentUser(updated);
        return updated;
      })
    );

    setTab("home");
  }

  const tabs = [
    { key: "home", icon: "🏠", label: "Home" },
    { key: "abastecer", icon: "⛽", label: "Registrar" },
    { key: "historico", icon: "📋", label: "Histórico" },
    { key: "perfil", icon: "👤", label: "Perfil" },
  ];

  if (screen === "login") {
    return (
      <div style={styles.phoneWrap}>
        <LoginScreen
          onLogin={handleLogin}
          onRegister={() => setScreen("register")}
        />
      </div>
    );
  }

  if (screen === "register") {
    return (
      <div style={styles.phoneWrap}>
        <RegisterScreen
          onBack={() => setScreen("login")}
          onCreated={handleRegister}
        />
      </div>
    );
  }

  return (
    <div style={styles.phoneWrap}>
      <div style={styles.appWrap}>
        <div style={styles.content}>
          {tab === "home" && (
            <HomeScreen user={currentUser} onNavigate={setTab} />
          )}
          {tab === "abastecer" && (
            <AbastecerScreen
              user={currentUser}
              onRegistered={handleRegistered}
            />
          )}
          {tab === "historico" && <HistoricoScreen user={currentUser} />}
          {tab === "perfil" && (
            <PerfilScreen
              user={currentUser}
              onLogout={() => {
                setCurrentUser(null);
                setScreen("login");
              }}
            />
          )}
        </div>

        <div style={styles.bottomNav}>
          {tabs.map((t) => (
            <button
              key={t.key}
              style={{
                ...styles.navBtn,
                ...(tab === t.key ? styles.navBtnActive : {}),
              }}
              onClick={() => setTab(t.key)}
            >
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <span
                style={{
                  fontSize: 10,
                  marginTop: 2,
                  fontWeight: tab === t.key ? 700 : 400,
                }}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ESTILOS ─────────────────────────────────────────────
const styles = {
  phoneWrap: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  appWrap: {
    width: "100%",
    maxWidth: 420,
    minHeight: "85vh",
    background: "#F5F5F0",
    borderRadius: 32,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
  },
  content: { flex: 1, overflowY: "auto" },
  screen: {
    minHeight: "100vh",
    background: "#F5F5F0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 32,
  },
  loginHeader: {
    width: "100%",
    background: "linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)",
    padding: "48px 24px 40px",
    textAlign: "center",
    borderRadius: "0 0 32px 32px",
    marginBottom: 24,
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 6,
  },
  logoIcon: { fontSize: 36 },
  logoText: {
    fontSize: 28,
    fontWeight: 900,
    color: "#FF6B00",
    letterSpacing: -1,
  },
  logoSub: { color: "rgba(255,255,255,0.6)", fontSize: 13, margin: 0 },
  loginCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "calc(100% - 48px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#1A1A2E",
    margin: "0 0 4px",
  },
  loginDesc: { fontSize: 13, color: "#6B7280", margin: "0 0 16px" },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1.5px solid #E5E7EB",
    fontSize: 15,
    marginBottom: 12,
    boxSizing: "border-box",
    outline: "none",
    background: "#FAFAFA",
  },
  select: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1.5px solid #E5E7EB",
    fontSize: 15,
    marginBottom: 12,
    boxSizing: "border-box",
    background: "#FAFAFA",
    outline: "none",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1A1A2E",
    display: "block",
    marginBottom: 6,
  },
  btnPrimary: {
    width: "100%",
    padding: "15px",
    borderRadius: 14,
    background: "linear-gradient(135deg, #FF6B00, #CC5500)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    marginBottom: 10,
  },
  btnGhost: {
    width: "100%",
    padding: "12px",
    borderRadius: 14,
    background: "transparent",
    color: "#FF6B00",
    fontSize: 13,
    fontWeight: 600,
    border: "1.5px solid #FF6B00",
    cursor: "pointer",
  },
  btnSmall: {
    padding: "6px 14px",
    borderRadius: 10,
    background: "#FF6B00",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#FF6B00",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    padding: 0,
  },
  error: { color: "#ef4444", fontSize: 12, marginBottom: 8 },
  demoHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 16,
    textAlign: "center",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#FF6B00",
    fontSize: 14,
    cursor: "pointer",
    padding: "0 0 12px",
    fontWeight: 600,
  },
  pageScroll: { overflowY: "auto" },
  homeHeader: {
    background: "linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)",
    padding: "24px 20px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLogo: {
    fontSize: 24,
    background: "#FF6B00",
    borderRadius: 12,
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  benefitBanner: {
    background: "linear-gradient(135deg, #1e3a5f, #0a2540)",
    margin: 16,
    borderRadius: 20,
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelBadge: {
    borderRadius: 16,
    width: 64,
    height: 64,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 20,
    margin: "0 16px 12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  walletRow: { display: "flex", justifyContent: "space-between" },
  walletItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  progressBar: {
    height: 8,
    background: "#F3F4F6",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 8,
    transition: "width 0.5s ease",
  },
  historyItem: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    paddingBottom: 12,
    borderBottom: "1px solid #F3F4F6",
    marginBottom: 12,
  },
  screenHeader: {
    background: "linear-gradient(135deg, #1A1A2E, #0F3460)",
    padding: "24px 20px 20px",
  },
  screenTitle: { color: "#fff", margin: 0, fontSize: 22, fontWeight: 800 },
  screenSub: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    margin: "4px 0 0",
  },
  pointsPreview: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#FFF7ED",
    borderRadius: 12,
    padding: "12px 16px",
    margin: "8px 0",
  },
  successIcon: { fontSize: 72, marginBottom: 16 },
  earnedCard: {
    background: "#fff",
    borderRadius: 24,
    padding: "24px 48px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(255,107,0,0.15)",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    background: "linear-gradient(135deg, #FF6B00, #CC5500)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid #F3F4F6",
    paddingTop: 16,
    marginTop: 8,
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  bottomNav: {
    background: "#fff",
    borderTop: "1px solid #F3F4F6",
    display: "flex",
    padding: "8px 0 12px",
    boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
  },
  navBtn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#6B7280",
    padding: "4px 0",
  },
  navBtnActive: { color: "#FF6B00" },
};
