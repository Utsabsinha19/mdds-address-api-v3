import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Select from "react-select";
import CountUp from "react-countup";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './context/auth-context';

// Ensure we have the actual component (handles CJS/ESM interop)
const CountUpComp = (CountUp && CountUp.default) ? CountUp.default : CountUp;
import "./App.css";
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { api } from './api/axios';

const API_BASE_URL = "/api/v1";

const normalizeName = (name = "") =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Skeleton = ({ className = "", style }) => (
  <div className={`skeleton ${className}`} style={style} />
);

const SearchResultSkeleton = () => (
  <div className="results-stack">
    {[...Array(3)].map((_, i) => (
      <div className="result-card is-loading" key={i}>
        <Skeleton style={{ height: 18, width: "48%" }} />
        <Skeleton style={{ height: 14, width: "82%" }} />
      </div>
    ))}
  </div>
);

const VillageDetailsSkeleton = () => (
  <section className="details-card">
    <Skeleton style={{ height: 18, width: "35%" }} />
    <Skeleton style={{ height: 34, width: "70%" }} />
    <Skeleton style={{ height: 16, width: "90%" }} />
    <Skeleton style={{ height: 58, width: "100%" }} />
    <Skeleton style={{ height: 44, width: "100%" }} />
  </section>
);

const Toast = ({ message }) => (
  <div className="toast" role="status">
    {message}
  </div>
);

// Analytics Dashboard Component
const AnalyticsDashboard = ({ analytics, loading, onClear }) => {
  const [exportFormat, setExportFormat] = useState("csv");
  const [showExportModal, setShowExportModal] = useState(false);

  if (loading) {
    return (
      <section className="analytics-section" aria-label="Usage analytics">
        <div className="analytics-container">
          <div className="analytics-header">
            <h2>Analytics & Insights</h2>
          </div>
          <div className="analytics-grid">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} style={{ height: 104, borderRadius: 16 }} />
            ))}
          </div>
          <Skeleton style={{ height: 200, borderRadius: 18, marginTop: 12 }} />
        </div>
      </section>
    );
  }

  if (!analytics) return null;

  const topSearches = analytics.topSearches.map((item) => ({
    query: item.query,
    count: item._count.query,
  }));

  const exportSearchHistory = () => {
    const data = {
      exportDate: new Date().toLocaleString(),
      totalSearches: analytics.totalSearches,
      uniqueQueries: analytics.uniqueQueries,
      topSearches: topSearches,
      recentSearches: analytics.recentSearches.slice(0, 20),
    };

    let content, filename, type;

    if (exportFormat === "csv") {
      const headers = ["Query", "Count"];
      const rows = topSearches.map(({ query, count }) => [query, count]);
      content = [headers, ...rows].map((row) => row.join(",")).join("\n");
      filename = "analytics.csv";
      type = "text/csv";
    } else {
      content = JSON.stringify(data, null, 2);
      filename = "analytics.json";
      type = "application/json";
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  return (
    <section className="analytics-section" aria-label="Usage analytics">
      <div className="analytics-container">
        <div className="analytics-header">
          <h2>Analytics & Insights</h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <button 
              className="ghost-button"
              onClick={onClear}
              type="button"
            >
              🗑️ Clear History
            </button>
            <button 
              className="ghost-button"
              onClick={() => setShowExportModal(true)}
              type="button"
            >
              📊 Export Data
            </button>
          </div>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="analytics-stat">
              <span className="stat-value">{analytics ? analytics.totalSearches : 0}</span>
              <p className="stat-label">Total Searches</p>
            </div>
          </div>

          <div className="analytics-card">
            <div className="analytics-stat">
              <span className="stat-value">{analytics ? analytics.uniqueQueries : 0}</span>
              <p className="stat-label">Unique Queries</p>
            </div>
          </div>

          <div className="analytics-card">
            <div className="analytics-stat">
              <span className="stat-value">{analytics ? analytics.recentSearches.length : 0}</span>
              <p className="stat-label">Recent Records</p>
            </div>
          </div>

          <div className="analytics-card">
            <div className="analytics-stat">
              <span className="stat-value">&lt;100ms</span>
              <p className="stat-label">Avg Response</p>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Top Searched Villages</h3>

          <div className="top-searches-container">
            {analytics?.topSearches?.map((item, index) => (
              <div
                key={index}
                className="top-search-item"
              >
                <span>
                  #{index + 1} {item.query}
                </span>

                <strong>
                  {item._count.query}
                </strong>
              </div>
            ))}
          </div>
        </div>

        {showExportModal && (
          <div className="export-modal-overlay" onClick={() => setShowExportModal(false)}>
            <div className="export-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Export Analytics Data</h3>
              <div className="format-selector">
                <label>
                  <input 
                    type="radio" 
                    value="csv" 
                    checked={exportFormat === "csv"}
                    onChange={(e) => setExportFormat(e.target.value)}
                  />
                  CSV Format
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="json" 
                    checked={exportFormat === "json"}
                    onChange={(e) => setExportFormat(e.target.value)}
                  />
                  JSON Format
                </label>
              </div>
              <div className="modal-actions">
                <button className="ghost-button" onClick={() => setShowExportModal(false)}>
                  Cancel
                </button>
                <button className="primary-button" onClick={exportSearchHistory}>
                  Export
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

function SearchApp() {
  const { user, logout } = useAuth();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [villageDetails, setVillageDetails] = useState(null);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    states: 0,
    districts: 0,
    subDistricts: 0,
    villages: 0
  });

  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [subDistrictsLoading, setSubDistrictsLoading] = useState(false);
  const [villagesLoading, setVillagesLoading] = useState(false);
  const [villageDetailsLoading, setVillageDetailsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const selectStyles = useMemo(
    () => ({
      control: (base, state) => ({
        ...base,
        minHeight: 52,
        borderRadius: 14,
        background: "rgba(255, 255, 255, 0.9)",
        borderColor: state.isFocused ? "#2563eb" : "rgba(15, 23, 42, 0.12)",
        boxShadow: state.isFocused
          ? "0 0 0 4px rgba(37, 99, 235, 0.14)"
          : "0 14px 32px rgba(15, 23, 42, 0.08)",
        cursor: "pointer",
        transition: "border-color 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          borderColor: state.isFocused ? "#2563eb" : "rgba(15, 23, 42, 0.24)",
        },
      }),
      container: (base) => ({ ...base, width: "100%" }),
      menu: (base) => ({
        ...base,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(15, 23, 42, 0.1)",
        boxShadow: "0 24px 70px rgba(15, 23, 42, 0.18)",
        zIndex: 20,
      }),
      menuList: (base) => ({ ...base, padding: 6 }),
      option: (base, state) => ({
        ...base,
        borderRadius: 10,
        color: "#0f172a",
        cursor: "pointer",
        backgroundColor: state.isSelected
          ? "rgba(37, 99, 235, 0.16)"
          : state.isFocused
            ? "rgba(20, 184, 166, 0.12)"
            : "transparent",
      }),
      placeholder: (base) => ({ ...base, color: "#64748b" }),
      singleValue: (base) => ({ ...base, color: "#0f172a", fontWeight: 700 }),
      input: (base) => ({ ...base, color: "#0f172a" }),
      indicatorSeparator: (base) => ({ ...base, backgroundColor: "rgba(15, 23, 42, 0.1)" }),
      dropdownIndicator: (base, state) => ({
        ...base,
        color: state.isFocused ? "#2563eb" : "#64748b",
      }),
      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    }),
    [],
  );

  const stateOptions = states.map((state) => ({ value: state.code, label: state.name }));
  const stateSearchResults =
    query.length >= 2
      ? stateOptions.filter((state) => normalizeName(state.label).includes(normalizeName(query))).slice(0, 6)
      : [];
  const districtOptions = districts.map((district) => ({
    value: district.code,
    label: district.district,
  }));
  const subDistrictOptions = subDistricts.map((subDistrict) => ({
    value: subDistrict.code,
    label: subDistrict.subDistrict,
  }));
  const villageOptions = villages.map((village) => ({
    value: village.code,
    label: village.village,
  }));

  const handleClearAnalytics = async () => {
    if (!window.confirm("Are you sure you want to clear all search history? This cannot be undone.")) return;
    try {
      await api.delete("/analytics");
      loadAnalytics(); // Refresh the dashboard stats
    } catch (error) {
      console.error("Failed to clear analytics:", error);
    }
  };

  useEffect(() => {
    if (query.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timerId = setTimeout(() => {
      setSearchLoading(true);
      setError(null);

      api
        .get(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setSearchResults(res.data);
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            console.error("Search failed:", err);
            setError("Search failed. Please try again.");
            setSearchResults([]);
          }
        })
        .finally(() => setSearchLoading(false));
    }, 300);

    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [query]);

  const loadFullAddressByCodes = async (codes) => {
    setDistrictsLoading(true);
    setSubDistrictsLoading(true);
    setVillagesLoading(true);
    setVillageDetailsLoading(true);

    try {
      const [districtsRes, subDistrictsRes, villagesRes, villageDetailsRes] = await Promise.all([
        api.get(`${API_BASE_URL}/districts/${codes.stateCode}`),
        api.get(`${API_BASE_URL}/subdistricts/${codes.districtCode}`),
        api.get(`${API_BASE_URL}/villages/${codes.subDistrictCode}`),
        api.get(`${API_BASE_URL}/village/${codes.villageCode}`),
      ]);

      setDistricts(districtsRes.data);
      setSubDistricts(subDistrictsRes.data);
      setVillages(villagesRes.data);
      setVillageDetails(villageDetailsRes.data);

      setSelectedState(codes.stateCode);
      setSelectedDistrict(codes.districtCode);
      setSelectedSubDistrict(codes.subDistrictCode);
      setSelectedVillage(codes.villageCode);
    } catch (err) {
      console.error("Failed to auto-fill address:", err);
      setError("Could not load the full address. Please try again.");
      handleClear();
    } finally {
      setDistrictsLoading(false);
      setSubDistrictsLoading(false);
      setVillagesLoading(false);
      setVillageDetailsLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      setAnalyticsLoading(true);

      const response = await api.get("/analytics");
      setAnalytics(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await api.get("/stats");
      setStats(response.data);

    } catch (error) {
      console.error("Stats Error:", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const [statesRes] = await Promise.all([
        api.get(`${API_BASE_URL}/states`),
        loadStats(),
        loadAnalytics(),
      ]);
      setStates(statesRes.data);
      const savedAddressJSON = localStorage.getItem("selectedAddress");
      if (savedAddressJSON) {
        await loadFullAddressByCodes(JSON.parse(savedAddressJSON));
      }
    };
    fetchInitialData().catch(console.error);
    // Initial data is intentionally loaded once when the workspace mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (villageDetails && selectedVillage) {
      const selectedAddress = {
        stateCode: selectedState,
        districtCode: selectedDistrict,
        subDistrictCode: selectedSubDistrict,
        villageCode: selectedVillage,
      };
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    } else if (!selectedVillage && localStorage.getItem("selectedAddress")) {
      localStorage.removeItem("selectedAddress");
    }
  }, [villageDetails, selectedState, selectedDistrict, selectedSubDistrict, selectedVillage]);

  async function loadDistricts(stateCode) {
    setSelectedState(stateCode);
    setDistricts([]);
    setSubDistricts([]);
    setVillages([]);
    setVillageDetails(null);
    setSelectedDistrict("");
    setSelectedSubDistrict("");
    setSelectedVillage("");
    setError(null);

    if (!stateCode) return;

    setDistrictsLoading(true);
    try {
      const res = await api.get(`${API_BASE_URL}/districts/${stateCode}`);
      setDistricts(res.data);
    } catch (err) {
      console.error("Failed to load districts:", err);
      setError("Could not load districts. Please try again.");
    } finally {
      setDistrictsLoading(false);
    }
  }

  async function loadSubDistricts(districtCode) {
    setSelectedDistrict(districtCode);
    setSubDistricts([]);
    setVillages([]);
    setVillageDetails(null);
    setSelectedSubDistrict("");
    setSelectedVillage("");
    setError(null);

    if (!districtCode) return;

    setSubDistrictsLoading(true);
    try {
      const res = await api.get(`${API_BASE_URL}/subdistricts/${districtCode}`);
      setSubDistricts(res.data);
    } catch (err) {
      console.error("Failed to load sub-districts:", err);
      setError("Could not load sub-districts. Please try again.");
    } finally {
      setSubDistrictsLoading(false);
    }
  }

  async function loadVillages(subDistrictCode) {
    setSelectedSubDistrict(subDistrictCode);
    setVillages([]);
    setVillageDetails(null);
    setSelectedVillage("");
    setError(null);

    if (!subDistrictCode) return;

    setVillagesLoading(true);
    try {
      const res = await api.get(`${API_BASE_URL}/villages/${subDistrictCode}`);
      setVillages(res.data);
    } catch (err) {
      console.error("Failed to load villages:", err);
      setError("Could not load villages. Please try again.");
    } finally {
      setVillagesLoading(false);
    }
  }

  async function loadVillageDetails(villageCode) {
    setSelectedVillage(villageCode);
    setError(null);

    if (!villageCode) {
      setVillageDetails(null);
      return;
    }

    setVillageDetailsLoading(true);
    try {
      const res = await api.get(`${API_BASE_URL}/village/${villageCode}`);
      setVillageDetails(res.data);
    } catch (err) {
      console.error("Failed to load village details:", err);
      setError("Could not load village details. Please try again.");
    } finally {
      setVillageDetailsLoading(false);
    }
  }

  const handleSearchResultClick = async (item) => {
    try {
      setQuery("");
      setSearchResults([]);
      setError(null);

      // Automatically populate the address hierarchy (State -> District -> SubDistrict -> Village)
      await loadFullAddressByCodes({
        stateCode: item.stateCode,
        districtCode: item.districtCode,
        subDistrictCode: item.subDistrictCode,
        villageCode: item.code,
      });
    } catch (err) {
      console.error("Failed to handle search click:", err);
      setError("Could not load selected village. Please try again.");
    }
  };

  const handleStateSearchClick = async (stateCode) => {
    setQuery("");
    setSearchResults([]);
    setError(null);
    await loadDistricts(stateCode);
  };

  const handleExportCSV = () => {
    if (searchResults.length === 0) return;

    const headers = ["Village", "SubDistrict", "District", "State", "Code"];
    const csvRows = searchResults.map((item) => [
      `"${item.village}"`,
      `"${item.subDistrict}"`,
      `"${item.district}"`,
      `"${item.state}"`,
      `"${item.code}"`,
    ]);

    const csvContent = [headers.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = query ? `mdds_export_${query.replace(/\s+/g, "_")}.csv` : "mdds_export.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportVillagesCSV = () => {
    if (villages.length === 0) return;

    const headers = ["State", "District", "SubDistrict", "Village", "Code"];
    const csvRows = villages.map((v) => [
      `"${selectedStateName || ""}"`,
      `"${selectedDistrictName || ""}"`,
      `"${selectedSubDistrictName || ""}"`,
      `"${v.village}"`,
      `"${v.code}"`,
    ]);

    const csvContent = [headers.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    const safeName = (selectedSubDistrictName || "villages").replace(/\s+/g, "_");
    a.download = `mdds_export_${safeName}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  function handleClear() {
    setDistricts([]);
    setSubDistricts([]);
    setVillages([]);
    setVillageDetails(null);
    setError(null);
    setQuery("");
    setSearchResults([]);
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedSubDistrict("");
    setSelectedVillage("");
  }

  const handleCopyToClipboard = () => {
    if (!villageDetails) return;

    const address = [villageDetails.village, villageDetails.subDistrict, villageDetails.district, villageDetails.state, "India", `Code: ${villageDetails.code}`].join("\n");

    navigator.clipboard
      .writeText(address)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setError("Failed to copy address to clipboard.");
      });
  };

  const handleDownloadJson = () => {
    if (!villageDetails) return;
    setIsDownloading(true);

    setTimeout(() => {
      const jsonString = JSON.stringify(villageDetails, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${villageDetails.code}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsDownloading(false);
    }, 600);
  };

  const selectedStateName = states.find((s) => s.code === selectedState)?.name || villageDetails?.state;
  const selectedDistrictName = districts.find((d) => d.code === selectedDistrict)?.district || villageDetails?.district;
  const selectedSubDistrictName = subDistricts.find((sd) => sd.code === selectedSubDistrict)?.subDistrict || villageDetails?.subDistrict;
  const selectedVillageName = villages.find((v) => v.code === selectedVillage)?.village || villageDetails?.village;

  const metrics = [
    {
      value: (
        <>
          <CountUpComp end={stats.villages} duration={2} separator="," />+
        </>
      ),
      label: "Villages",
      tone: "jade",
    },
    {
      value: (
        <>
          <CountUpComp end={stats.subDistricts} duration={2} separator="," />+
        </>
      ),
      label: "Sub-districts",
      tone: "amber",
    },
    {
      value: (
        <>
          <CountUpComp end={stats.districts} duration={2} separator="," />+
        </>
      ),
      label: "Districts",
      tone: "rose",
    },
    {
      value: <CountUpComp end={stats.states} duration={2} separator="," />,
      label: "States",
      tone: "sky",
    },
  ];

  return (
    <main className="app-shell">
      <nav className="app-nav">
        <Link className="app-nav-brand" to="/">
          <span className="brand-symbol">M</span>
          <span>
            <strong>MDDS Address</strong>
            <small>Intelligence Platform</small>
          </span>
        </Link>
        <div className="app-nav-actions">
          <span className="app-nav-welcome">
            Welcome, <strong>{user?.fullName || "User"}</strong>
          </span>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout} type="button">Sign out</button>
        </div>
      </nav>
      <section className="hero-section" aria-labelledby="page-title">
        <div className="hero-copy">
          <span className="eyebrow">Official hierarchy search</span>
          <h1 id="page-title">MDDS Address Intelligence Platform</h1>
          <p>
            Explore India's administrative geography with a fast search layer,
            guided hierarchy selection, and clean MDDS village records.
          </p>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Dataset coverage">
        {metrics.map((metric) => (
          <article className={`metric-card ${metric.tone}`} key={metric.label}>
            <span>{metric.value}</span>
            <p>{metric.label}</p>
          </article>
        ))}
      </section>

      <AnalyticsDashboard 
        analytics={analytics} 
        loading={analyticsLoading}
        onClear={handleClearAnalytics}
      />

      <section className="workspace-grid" aria-label="Address finder">
        <div className="panel search-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">Search</span>
              <h2>Find a village instantly</h2>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {searchResults.length > 0 && (
                <button className="ghost-button" onClick={handleExportCSV} type="button">
                  📥 Export CSV
                </button>
              )}
              <button className="ghost-button" onClick={handleClear} type="button">
                Clear
              </button>
            </div>
          </div>

          <label className="search-field">
            <span className="search-icon" aria-hidden="true">
              /
            </span>
            <input
              type="text"
              placeholder="Search village name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          {searchLoading && <SearchResultSkeleton />}

          {error && (
            <div className="status-message error" role="alert">
              {error}
            </div>
          )}

          {!searchLoading &&
            !error &&
            searchResults.length === 0 &&
            stateSearchResults.length === 0 &&
            query.length >= 2 && (
            <div className="status-message">No villages found for "{query}".</div>
          )}

          {!searchLoading && (stateSearchResults.length > 0 || searchResults.length > 0) && (
            <div className="results-stack">
              {stateSearchResults.map((item) => (
                <button
                  className="result-card state-result"
                  key={`state-${item.value}`}
                  onClick={() => handleStateSearchClick(item.value)}
                  type="button"
                >
                  <small>State / region</small>
                  <span>{item.label}</span>
                  <p>Select this region and load its districts on the map.</p>
                </button>
              ))}
              {searchResults.map((item) => (
                <button
                  className="result-card"
                  key={item.code}
                  onClick={() => handleSearchResultClick(item)}
                  type="button"
                >
                  <span>{item.village}</span>
                  <p>
                    {item.subDistrict}, {item.district}, {item.state}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="panel selector-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">Navigator</span>
              <h2>Build the address path</h2>
            </div>
            {villages.length > 0 && (
              <button className="ghost-button" onClick={handleExportVillagesCSV} type="button">
                📥 Export Villages
              </button>
            )}
          </div>

          <div className="select-flow">
            <label>
              <span>State</span>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                menuPortalTarget={document.body}
                styles={selectStyles}
                placeholder="Select state"
                options={stateOptions}
                value={stateOptions.find((option) => option.value === selectedState)}
                onChange={(option) => loadDistricts(option ? option.value : "")}
                isClearable
              />
            </label>

            <label>
              <span>District</span>
              {districtsLoading ? (
                <Skeleton className="select-skeleton" />
              ) : (
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  styles={selectStyles}
                  placeholder="Select district"
                  options={districtOptions}
                  value={districtOptions.find((option) => option.value === selectedDistrict)}
                  onChange={(option) => loadSubDistricts(option ? option.value : "")}
                  isDisabled={!selectedState}
                  isClearable
                />
              )}
            </label>

            <label>
              <span>Sub-district</span>
              {subDistrictsLoading ? (
                <Skeleton className="select-skeleton" />
              ) : (
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  styles={selectStyles}
                  placeholder="Select sub-district"
                  options={subDistrictOptions}
                  value={subDistrictOptions.find((option) => option.value === selectedSubDistrict)}
                  onChange={(option) => loadVillages(option ? option.value : "")}
                  isDisabled={!selectedDistrict}
                  isClearable
                />
              )}
            </label>

            <label>
              <span>Village</span>
              {villagesLoading ? (
                <Skeleton className="select-skeleton" />
              ) : (
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  styles={selectStyles}
                  placeholder="Select village"
                  options={villageOptions}
                  value={
                    villageOptions.find((option) => option.value === selectedVillage) ||
                    (selectedVillage && villageDetails ? { value: selectedVillage, label: villageDetails.village } : null)
                  }
                  onChange={(option) => loadVillageDetails(option ? option.value : "")}
                  isDisabled={!selectedSubDistrict}
                  isClearable
                />
              )}
            </label>
          </div>
        </div>

        <div className="details-column">
          {villageDetailsLoading ? (
            <VillageDetailsSkeleton />
          ) : villageDetails ? (
            <section className="details-card">
              <span className="section-kicker">Selected record</span>
              <h2>{villageDetails.village}</h2>
              <p className="address-line">
                {villageDetails.subDistrict}, {villageDetails.district}, {villageDetails.state}
              </p>

              <div className="code-panel">
                <span>MDDS Code</span>
                <strong>{villageDetails.code}</strong>
              </div>

              <div className="button-group">
                <button
                  className="primary-button"
                  disabled={isCopied}
                  onClick={handleCopyToClipboard}
                  type="button"
                >
                  {isCopied ? "Copied" : "Copy full address"}
                </button>
                <button 
                  className="secondary-button" 
                  onClick={handleDownloadJson} 
                  type="button"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                      <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ width: 16, height: 16 }}>
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      Downloading...
                    </span>
                  ) : (
                    "Download JSON"
                  )}
                </button>
              </div>
            </section>
          ) : (
            <section className="details-card empty-state">
              <span className="section-kicker">Preview</span>
              <h2>Choose a village to inspect the record.</h2>
              <p>
                Your selected MDDS code, hierarchy, and copy action will appear
                here once the address path is complete.
              </p>
            </section>
          )}

          <div className="path-card">
            <h4>Current Path</h4>
            {selectedState ? (
              <p>
                India → {selectedStateName}
                {selectedDistrict && ` → ${selectedDistrictName}`}
                {selectedSubDistrict && ` → ${selectedSubDistrictName}`}
                {selectedVillage && ` → ${selectedVillageName}`}
              </p>
            ) : (
              <p>No active selection</p>
            )}
          </div>
        </div>
      </section>

      <section className="panel" style={{ marginTop: "24px", marginBottom: "24px" }} aria-label="Developer Playground">
        <div className="panel-heading" style={{ marginBottom: "24px" }}>
          <div>
            <span className="section-kicker">Developer API</span>
            <h2>API Playground</h2>
            <p className="address-line" style={{ marginTop: "8px" }}>
              Build upon the MDDS dataset. Integrate official hierarchical address data directly into your apps.
            </p>
          </div>
          <a 
            href="http://localhost:3000/api-docs" 
            target="_blank" 
            rel="noreferrer" 
            className="ghost-button" 
            style={{ display: "flex", alignItems: "center", textDecoration: "none", height: "fit-content", whiteSpace: "nowrap" }}
          >
            📚 Swagger Docs
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="code-panel">
              <span>Search Endpoint</span>
              <strong style={{ fontSize: "16px", color: "#2563eb", wordBreak: "break-all" }}>GET /api/v1/search?q=kolkata</strong>
            </div>
            <div className="code-panel">
              <span>Village Details Endpoint</span>
              <strong style={{ fontSize: "16px", color: "#14b8a6", wordBreak: "break-all" }}>GET /api/v1/village/321151</strong>
            </div>
            <div className="code-panel">
              <span>Hierarchy Endpoint</span>
              <strong style={{ fontSize: "16px", color: "#f59e0b", wordBreak: "break-all" }}>GET /api/v1/states</strong>
            </div>
          </div>
          <div className="code-panel" style={{ background: "#0f172a", border: "1px solid #1e293b", margin: 0 }}>
            <span style={{ color: "#94a3b8" }}>Response Preview (Search)</span>
            <pre style={{ margin: "16px 0 0", color: "#e2e8f0", fontSize: "14px", fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace", whiteSpace: "pre-wrap" }}>
{`[
  {
    "code": "321151",
    "village": "Kolkata",
    "subDistrict": "Kolkata",
    "district": "Kolkata",
    "state": "WEST BENGAL"
  }
]`}
            </pre>
          </div>
        </div>
      </section>

      <footer className="app-footer">
        <div>
          <strong>MDDS Address API</strong>
          <p>Designed and developed by Utsab Sinha.</p>
        </div>
        <p>2026. Hierarchical address intelligence for India.</p>
      </footer>

      {isCopied && <Toast message="Copied to clipboard" />}
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Area */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<SearchApp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
