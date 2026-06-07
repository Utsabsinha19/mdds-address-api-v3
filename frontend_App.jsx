import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.jsx");const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"]; const useMemo = __vite__cjsImport0_react["useMemo"];const CountUp = __vite__cjsImport3_reactCountup;const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport4_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=dae76444";
import axios from "/node_modules/.vite/deps/axios.js?v=dae76444";
import Select from "/node_modules/.vite/deps/react-select.js?v=dae76444";
import __vite__cjsImport3_reactCountup from "/node_modules/.vite/deps/react-countup.js?v=dae76444";
var _jsxFileName = "C:/Users/Utsab Sinha/Downloads/mdds-address-api/mdds-address-api/frontend/src/App.jsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=dae76444";
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
// Debug: log imported component shapes to help identify invalid element types
try {
	// eslint-disable-next-line no-console
	console.debug("react-select import:", Select);
	// eslint-disable-next-line no-console
	console.debug("react-countup import:", CountUp);
} catch (e) {
	// eslint-disable-next-line no-console
	console.error("Error logging imports:", e);
}
import "/src/App.css";
const API_BASE_URL = "http://localhost:3000/api/v1";
const normalizeName = (name = "") => name.toLowerCase().replace(/&/g, "and").replace(/_/g, " ").replace(/\s+/g, " ").trim();
const Skeleton = ({ className = "", style }) => /* @__PURE__ */ _jsxDEV("div", {
	className: `skeleton ${className}`,
	style
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 29,
	columnNumber: 3
}, this);
_c = Skeleton;
const SearchResultSkeleton = () => /* @__PURE__ */ _jsxDEV("div", {
	className: "results-stack",
	children: [...Array(3)].map((_, i) => /* @__PURE__ */ _jsxDEV("div", {
		className: "result-card is-loading",
		children: [/* @__PURE__ */ _jsxDEV(Skeleton, { style: {
			height: 18,
			width: "48%"
		} }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 36,
			columnNumber: 9
		}, this), /* @__PURE__ */ _jsxDEV(Skeleton, { style: {
			height: 14,
			width: "82%"
		} }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 9
		}, this)]
	}, i, true, {
		fileName: _jsxFileName,
		lineNumber: 35,
		columnNumber: 7
	}, this))
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 33,
	columnNumber: 3
}, this);
_c2 = SearchResultSkeleton;
const VillageDetailsSkeleton = () => /* @__PURE__ */ _jsxDEV("section", {
	className: "details-card",
	children: [
		/* @__PURE__ */ _jsxDEV(Skeleton, { style: {
			height: 18,
			width: "35%"
		} }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 45,
			columnNumber: 5
		}, this),
		/* @__PURE__ */ _jsxDEV(Skeleton, { style: {
			height: 34,
			width: "70%"
		} }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 46,
			columnNumber: 5
		}, this),
		/* @__PURE__ */ _jsxDEV(Skeleton, { style: {
			height: 16,
			width: "90%"
		} }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 5
		}, this),
		/* @__PURE__ */ _jsxDEV(Skeleton, { style: {
			height: 58,
			width: "100%"
		} }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 48,
			columnNumber: 5
		}, this),
		/* @__PURE__ */ _jsxDEV(Skeleton, { style: {
			height: 44,
			width: "100%"
		} }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 49,
			columnNumber: 5
		}, this)
	]
}, void 0, true, {
	fileName: _jsxFileName,
	lineNumber: 44,
	columnNumber: 3
}, this);
_c3 = VillageDetailsSkeleton;
const Toast = ({ message }) => /* @__PURE__ */ _jsxDEV("div", {
	className: "toast",
	role: "status",
	children: message
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 54,
	columnNumber: 3
}, this);
_c4 = Toast;
// Analytics Dashboard Component
const AnalyticsDashboard = ({ searchHistory, recentSearches }) => {
	_s();
	const [exportFormat, setExportFormat] = useState("csv");
	const [showExportModal, setShowExportModal] = useState(false);
	const getTopSearches = () => {
		const freq = {};
		searchHistory.forEach((item) => {
			freq[item] = (freq[item] || 0) + 1;
		});
		return Object.entries(freq).sort(([, a], [, b]) => b - a).slice(0, 5).map(([query, count]) => ({
			query,
			count
		}));
	};
	const exportSearchHistory = () => {
		const data = {
			exportDate: new Date().toLocaleString(),
			totalSearches: searchHistory.length,
			uniqueQueries: new Set(searchHistory).size,
			topSearches: getTopSearches(),
			recentSearches: recentSearches.slice(0, 20)
		};
		let content, filename, type;
		if (exportFormat === "csv") {
			const headers = ["Query", "Count"];
			const rows = getTopSearches().map(({ query, count }) => [query, count]);
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
	const topSearches = getTopSearches();
	return /* @__PURE__ */ _jsxDEV("section", {
		className: "analytics-section",
		"aria-label": "Usage analytics",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "analytics-container",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "analytics-header",
					children: [/* @__PURE__ */ _jsxDEV("h2", { children: "Analytics & Insights" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						className: "ghost-button",
						onClick: () => setShowExportModal(true),
						type: "button",
						children: "📊 Export Data"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "analytics-grid",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "analytics-card",
							children: /* @__PURE__ */ _jsxDEV("div", {
								className: "analytics-stat",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "stat-value",
									children: searchHistory.length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 129,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "stat-label",
									children: "Total Searches"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "analytics-card",
							children: /* @__PURE__ */ _jsxDEV("div", {
								className: "analytics-stat",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "stat-value",
									children: new Set(searchHistory).size
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "stat-label",
									children: "Unique Queries"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 137,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "analytics-card",
							children: /* @__PURE__ */ _jsxDEV("div", {
								className: "analytics-stat",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "stat-value",
									children: recentSearches.length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "stat-label",
									children: "Recent Records"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "analytics-card",
							children: /* @__PURE__ */ _jsxDEV("div", {
								className: "analytics-stat",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "stat-value",
									children: "<100ms"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 150,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "stat-label",
									children: "Avg Response"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 151,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 148,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "trending-section",
					children: [/* @__PURE__ */ _jsxDEV("h3", { children: "Top Searched Villages" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 157,
						columnNumber: 11
					}, this), topSearches.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
						className: "trending-list",
						children: topSearches.map((item, idx) => /* @__PURE__ */ _jsxDEV("div", {
							className: "trending-item",
							children: [
								/* @__PURE__ */ _jsxDEV("span", {
									className: "trending-rank",
									children: ["#", idx + 1]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 162,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									className: "trending-name",
									children: item.query
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 163,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									className: "trending-count",
									children: [item.count, " searches"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 19
								}, this)
							]
						}, idx, true, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 159,
						columnNumber: 13
					}, this) : /* @__PURE__ */ _jsxDEV("p", {
						className: "empty-state",
						children: "No search history yet"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 156,
					columnNumber: 9
				}, this),
				showExportModal && /* @__PURE__ */ _jsxDEV("div", {
					className: "export-modal-overlay",
					onClick: () => setShowExportModal(false),
					children: /* @__PURE__ */ _jsxDEV("div", {
						className: "export-modal",
						onClick: (e) => e.stopPropagation(),
						children: [
							/* @__PURE__ */ _jsxDEV("h3", { children: "Export Analytics Data" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "format-selector",
								children: [/* @__PURE__ */ _jsxDEV("label", { children: [/* @__PURE__ */ _jsxDEV("input", {
									type: "radio",
									value: "csv",
									checked: exportFormat === "csv",
									onChange: (e) => setExportFormat(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 179,
									columnNumber: 19
								}, this), "CSV Format"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 178,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("label", { children: [/* @__PURE__ */ _jsxDEV("input", {
									type: "radio",
									value: "json",
									checked: exportFormat === "json",
									onChange: (e) => setExportFormat(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 188,
									columnNumber: 19
								}, this), "JSON Format"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 187,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "modal-actions",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									className: "ghost-button",
									onClick: () => setShowExportModal(false),
									children: "Cancel"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									className: "primary-button",
									onClick: exportSearchHistory,
									children: "Export"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 201,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 174,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 114,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 113,
		columnNumber: 5
	}, this);
};
_s(AnalyticsDashboard, "IN3dB5zK2Z2uCOLCAgE+dbMgUa4=");
_c5 = AnalyticsDashboard;
function App() {
	_s2();
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
	const [analytics, setAnalytics] = useState({
		totalSearches: 0,
		uniqueQueries: 0,
		recentRecords: 0,
		avgResponse: "<100ms"
	});
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
	// Analytics state
	const [searchHistory, setSearchHistory] = useState([]);
	const [recentSearches, setRecentSearches] = useState([]);
	const selectStyles = useMemo(() => ({
		control: (base, state) => ({
			...base,
			minHeight: 52,
			borderRadius: 14,
			background: "rgba(255, 255, 255, 0.9)",
			borderColor: state.isFocused ? "#2563eb" : "rgba(15, 23, 42, 0.12)",
			boxShadow: state.isFocused ? "0 0 0 4px rgba(37, 99, 235, 0.14)" : "0 14px 32px rgba(15, 23, 42, 0.08)",
			cursor: "pointer",
			transition: "border-color 160ms ease, box-shadow 160ms ease",
			"&:hover": { borderColor: state.isFocused ? "#2563eb" : "rgba(15, 23, 42, 0.24)" }
		}),
		container: (base) => ({
			...base,
			width: "100%"
		}),
		menu: (base) => ({
			...base,
			borderRadius: 14,
			overflow: "hidden",
			border: "1px solid rgba(15, 23, 42, 0.1)",
			boxShadow: "0 24px 70px rgba(15, 23, 42, 0.18)",
			zIndex: 20
		}),
		menuList: (base) => ({
			...base,
			padding: 6
		}),
		option: (base, state) => ({
			...base,
			borderRadius: 10,
			color: "#0f172a",
			cursor: "pointer",
			backgroundColor: state.isSelected ? "rgba(37, 99, 235, 0.16)" : state.isFocused ? "rgba(20, 184, 166, 0.12)" : "transparent"
		}),
		placeholder: (base) => ({
			...base,
			color: "#64748b"
		}),
		singleValue: (base) => ({
			...base,
			color: "#0f172a",
			fontWeight: 700
		}),
		input: (base) => ({
			...base,
			color: "#0f172a"
		}),
		indicatorSeparator: (base) => ({
			...base,
			backgroundColor: "rgba(15, 23, 42, 0.1)"
		}),
		dropdownIndicator: (base, state) => ({
			...base,
			color: state.isFocused ? "#2563eb" : "#64748b"
		})
	}), []);
	const stateOptions = states.map((state) => ({
		value: state.code,
		label: state.name
	}));
	const stateSearchResults = query.length >= 2 ? stateOptions.filter((state) => normalizeName(state.label).includes(normalizeName(query))).slice(0, 6) : [];
	const districtOptions = districts.map((district) => ({
		value: district.code,
		label: district.district
	}));
	const subDistrictOptions = subDistricts.map((subDistrict) => ({
		value: subDistrict.code,
		label: subDistrict.subDistrict
	}));
	const villageOptions = villages.map((village) => ({
		value: village.code,
		label: village.village
	}));
	useEffect(() => {
		if (query.length < 2) {
			return;
		}
		const controller = new AbortController();
		const timerId = setTimeout(() => {
			setSearchLoading(true);
			setError(null);
			axios.get(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, { signal: controller.signal }).then((res) => {
				setSearchResults(res.data);
				// Track search history
				setSearchHistory((prev) => [...prev, query]);
			}).catch((err) => {
				if (!axios.isCancel(err)) {
					console.error("Search failed:", err);
					setError("Search failed. Please try again.");
					setSearchResults([]);
				}
			}).finally(() => setSearchLoading(false));
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
				axios.get(`${API_BASE_URL}/districts/${codes.stateCode}`),
				axios.get(`${API_BASE_URL}/subdistricts/${codes.districtCode}`),
				axios.get(`${API_BASE_URL}/villages/${codes.subDistrictCode}`),
				axios.get(`${API_BASE_URL}/village/${codes.villageCode}`)
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
	const loadStats = async () => {
		try {
			const response = await fetch("http://localhost:3000/stats");
			const data = await response.json();
			setStats(data);
		} catch (error) {
			console.error("Stats Error:", error);
		}
	};
	useEffect(() => {
		const fetchInitialData = async () => {
			const statesRes = await axios.get(`${API_BASE_URL}/states`);
			setStates(statesRes.data);
			const savedAddressJSON = localStorage.getItem("selectedAddress");
			if (savedAddressJSON) {
				await loadFullAddressByCodes(JSON.parse(savedAddressJSON));
			}
		};
		fetchInitialData().catch(console.error);
		loadStats();
	}, []);
	useEffect(() => {
		if (villageDetails && selectedVillage) {
			const selectedAddress = {
				stateCode: selectedState,
				districtCode: selectedDistrict,
				subDistrictCode: selectedSubDistrict,
				villageCode: selectedVillage
			};
			localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
		} else if (!selectedVillage && localStorage.getItem("selectedAddress")) {
			localStorage.removeItem("selectedAddress");
		}
	}, [
		villageDetails,
		selectedState,
		selectedDistrict,
		selectedSubDistrict,
		selectedVillage
	]);
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
			const res = await axios.get(`${API_BASE_URL}/districts/${stateCode}`);
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
			const res = await axios.get(`${API_BASE_URL}/subdistricts/${districtCode}`);
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
			const res = await axios.get(`${API_BASE_URL}/villages/${subDistrictCode}`);
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
			const res = await axios.get(`${API_BASE_URL}/village/${villageCode}`);
			setVillageDetails(res.data);
			// Track recent search
			setRecentSearches((prev) => [{
				village: res.data.village,
				code: res.data.code,
				timestamp: new Date().toLocaleTimeString()
			}, ...prev.slice(0, 19)]);
		} catch (err) {
			console.error("Failed to load village details:", err);
			setError("Could not load village details. Please try again.");
		} finally {
			setVillageDetailsLoading(false);
		}
	}
	const handleSearchResultClick = async (item) => {
		console.log(item);
	};
	const handleStateSearchClick = async (stateCode) => {
		setQuery("");
		setSearchResults([]);
		setError(null);
		await loadDistricts(stateCode);
	};
	const handleClear = () => {
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
	};
	const handleCopyToClipboard = () => {
		if (!villageDetails) return;
		const address = [
			villageDetails.village,
			villageDetails.subDistrict,
			villageDetails.district,
			villageDetails.state,
			"India",
			`Code: ${villageDetails.code}`
		].join("\n");
		navigator.clipboard.writeText(address).then(() => {
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2e3);
		}).catch((err) => {
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
	const selectedStateName = states.find((s) => s.code === selectedState)?.name;
	const selectedDistrictName = districts.find((d) => d.code === selectedDistrict)?.district;
	const selectedSubDistrictName = subDistricts.find((sd) => sd.code === selectedSubDistrict)?.subDistrict;
	const selectedVillageName = villages.find((v) => v.code === selectedVillage)?.village;
	const metrics = [
		{
			value: /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(CountUp, {
				end: stats.villages,
				duration: 2,
				separator: ","
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 604,
				columnNumber: 11
			}, this), "+"] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 603,
				columnNumber: 9
			}, this),
			label: "Villages",
			tone: "jade"
		},
		{
			value: /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(CountUp, {
				end: stats.subDistricts,
				duration: 2,
				separator: ","
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 613,
				columnNumber: 11
			}, this), "+"] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 612,
				columnNumber: 9
			}, this),
			label: "Sub-districts",
			tone: "amber"
		},
		{
			value: /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(CountUp, {
				end: stats.districts,
				duration: 2,
				separator: ","
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 622,
				columnNumber: 11
			}, this), "+"] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 621,
				columnNumber: 9
			}, this),
			label: "Districts",
			tone: "rose"
		},
		{
			value: /* @__PURE__ */ _jsxDEV(CountUp, {
				end: stats.states,
				duration: 2,
				separator: ","
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 629,
				columnNumber: 14
			}, this),
			label: "States",
			tone: "sky"
		}
	];
	return /* @__PURE__ */ _jsxDEV("main", {
		className: "app-shell",
		children: [
			/* @__PURE__ */ _jsxDEV("section", {
				className: "hero-section",
				"aria-labelledby": "page-title",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "hero-copy",
					children: [
						/* @__PURE__ */ _jsxDEV("span", {
							className: "eyebrow",
							children: "Official hierarchy search"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 639,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("h1", {
							id: "page-title",
							children: "MDDS Address Intelligence Platform"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 640,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("p", { children: "Explore India's administrative geography with a fast search layer, guided hierarchy selection, and clean MDDS village records." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 641,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 638,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 637,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("section", {
				className: "metrics-grid",
				"aria-label": "Dataset coverage",
				children: metrics.map((metric) => /* @__PURE__ */ _jsxDEV("article", {
					className: `metric-card ${metric.tone}`,
					children: [/* @__PURE__ */ _jsxDEV("span", { children: metric.value }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 651,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("p", { children: metric.label }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 652,
						columnNumber: 13
					}, this)]
				}, metric.label, true, {
					fileName: _jsxFileName,
					lineNumber: 650,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 648,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(AnalyticsDashboard, {
				searchHistory,
				recentSearches
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 657,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("section", {
				className: "workspace-grid",
				"aria-label": "Address finder",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "panel search-panel",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "panel-heading",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "section-kicker",
									children: "Search"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 666,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("h2", { children: "Find a village instantly" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 667,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 665,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									className: "ghost-button",
									onClick: handleClear,
									type: "button",
									children: "Clear"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 669,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 664,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("label", {
								className: "search-field",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "search-icon",
									"aria-hidden": "true",
									children: "/"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 675,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									placeholder: "Search village name",
									value: query,
									onChange: (e) => setQuery(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 678,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 674,
								columnNumber: 11
							}, this),
							searchLoading && /* @__PURE__ */ _jsxDEV(SearchResultSkeleton, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 686,
								columnNumber: 29
							}, this),
							error && /* @__PURE__ */ _jsxDEV("div", {
								className: "status-message error",
								role: "alert",
								children: error
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 689,
								columnNumber: 13
							}, this),
							!searchLoading && !error && searchResults.length === 0 && stateSearchResults.length === 0 && query.length >= 2 && /* @__PURE__ */ _jsxDEV("div", {
								className: "status-message",
								children: [
									"No villages found for \"",
									query,
									"\"."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 699,
								columnNumber: 13
							}, this),
							!searchLoading && (stateSearchResults.length > 0 || searchResults.length > 0) && /* @__PURE__ */ _jsxDEV("div", {
								className: "results-stack",
								children: [stateSearchResults.map((item) => /* @__PURE__ */ _jsxDEV("button", {
									className: "result-card state-result",
									onClick: () => handleStateSearchClick(item.value),
									type: "button",
									children: [
										/* @__PURE__ */ _jsxDEV("small", { children: "State / region" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 711,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("span", { children: item.label }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 712,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("p", { children: "Select this region and load its districts on the map." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 713,
											columnNumber: 19
										}, this)
									]
								}, `state-${item.value}`, true, {
									fileName: _jsxFileName,
									lineNumber: 705,
									columnNumber: 17
								}, this)), searchResults.map((item) => /* @__PURE__ */ _jsxDEV("button", {
									className: "result-card",
									onClick: () => handleSearchResultClick(item),
									type: "button",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: item.village }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 723,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("p", { children: [
										item.subDistrict,
										", ",
										item.district,
										", ",
										item.state
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 724,
										columnNumber: 19
									}, this)]
								}, item.code, true, {
									fileName: _jsxFileName,
									lineNumber: 717,
									columnNumber: 17
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 703,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 663,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "panel selector-panel",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "panel-heading",
							children: /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "section-kicker",
								children: "Navigator"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 736,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("h2", { children: "Build the address path" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 737,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 735,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 734,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "select-flow",
							children: [
								/* @__PURE__ */ _jsxDEV("label", { children: [/* @__PURE__ */ _jsxDEV("span", { children: "State" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 743,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV(Select, {
									styles: selectStyles,
									placeholder: "Select state",
									options: stateOptions,
									value: stateOptions.find((option) => option.value === selectedState),
									onChange: (option) => loadDistricts(option ? option.value : ""),
									isClearable: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 744,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 742,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("label", { children: [/* @__PURE__ */ _jsxDEV("span", { children: "District" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 755,
									columnNumber: 15
								}, this), districtsLoading ? /* @__PURE__ */ _jsxDEV(Skeleton, { className: "select-skeleton" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 757,
									columnNumber: 17
								}, this) : /* @__PURE__ */ _jsxDEV(Select, {
									styles: selectStyles,
									placeholder: "Select district",
									options: districtOptions,
									value: districtOptions.find((option) => option.value === selectedDistrict),
									onChange: (option) => loadSubDistricts(option ? option.value : ""),
									isDisabled: !selectedState,
									isClearable: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 759,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 754,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("label", { children: [/* @__PURE__ */ _jsxDEV("span", { children: "Sub-district" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 772,
									columnNumber: 15
								}, this), subDistrictsLoading ? /* @__PURE__ */ _jsxDEV(Skeleton, { className: "select-skeleton" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 774,
									columnNumber: 17
								}, this) : /* @__PURE__ */ _jsxDEV(Select, {
									styles: selectStyles,
									placeholder: "Select sub-district",
									options: subDistrictOptions,
									value: subDistrictOptions.find((option) => option.value === selectedSubDistrict),
									onChange: (option) => loadVillages(option ? option.value : ""),
									isDisabled: !selectedDistrict,
									isClearable: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 776,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 771,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("label", { children: [/* @__PURE__ */ _jsxDEV("span", { children: "Village" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 789,
									columnNumber: 15
								}, this), villagesLoading ? /* @__PURE__ */ _jsxDEV(Skeleton, { className: "select-skeleton" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 791,
									columnNumber: 17
								}, this) : /* @__PURE__ */ _jsxDEV(Select, {
									styles: selectStyles,
									placeholder: "Select village",
									options: villageOptions,
									value: villageOptions.find((option) => option.value === selectedVillage),
									onChange: (option) => loadVillageDetails(option ? option.value : ""),
									isDisabled: !selectedSubDistrict,
									isClearable: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 793,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 788,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 741,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 733,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "details-column",
						children: [villageDetailsLoading ? /* @__PURE__ */ _jsxDEV(VillageDetailsSkeleton, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 809,
							columnNumber: 13
						}, this) : villageDetails ? /* @__PURE__ */ _jsxDEV("section", {
							className: "details-card",
							children: [
								/* @__PURE__ */ _jsxDEV("span", {
									className: "section-kicker",
									children: "Selected record"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 812,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("h2", { children: villageDetails.village }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 813,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "address-line",
									children: [
										villageDetails.subDistrict,
										", ",
										villageDetails.district,
										", ",
										villageDetails.state
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 814,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "code-panel",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "MDDS Code" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 819,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("strong", { children: villageDetails.code }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 820,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 818,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "button-group",
									children: [/* @__PURE__ */ _jsxDEV("button", {
										className: "primary-button",
										disabled: isCopied,
										onClick: handleCopyToClipboard,
										type: "button",
										children: isCopied ? "Copied" : "Copy full address"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 824,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										className: "secondary-button",
										onClick: handleDownloadJson,
										type: "button",
										disabled: isDownloading,
										children: isDownloading ? /* @__PURE__ */ _jsxDEV("span", {
											style: {
												display: "flex",
												alignItems: "center",
												gap: "8px",
												justifyContent: "center"
											},
											children: [/* @__PURE__ */ _jsxDEV("svg", {
												className: "spinner",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "3",
												strokeLinecap: "round",
												style: {
													width: 16,
													height: 16
												},
												children: /* @__PURE__ */ _jsxDEV("path", { d: "M21 12a9 9 0 11-6.219-8.56" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 841,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 840,
												columnNumber: 23
											}, this), "Downloading..."]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 839,
											columnNumber: 21
										}, this) : "Download JSON"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 832,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 823,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 811,
							columnNumber: 13
						}, this) : /* @__PURE__ */ _jsxDEV("section", {
							className: "details-card empty-state",
							children: [
								/* @__PURE__ */ _jsxDEV("span", {
									className: "section-kicker",
									children: "Preview"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 853,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("h2", { children: "Choose a village to inspect the record." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 854,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("p", { children: "Your selected MDDS code, hierarchy, and copy action will appear here once the address path is complete." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 855,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 852,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "path-card",
							children: [/* @__PURE__ */ _jsxDEV("h4", { children: "Current Path" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 863,
								columnNumber: 13
							}, this), selectedState ? /* @__PURE__ */ _jsxDEV("p", { children: [
								"India → ",
								selectedStateName,
								selectedDistrict && ` → ${selectedDistrictName}`,
								selectedSubDistrict && ` → ${selectedSubDistrictName}`,
								selectedVillage && ` → ${selectedVillageName}`
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 865,
								columnNumber: 15
							}, this) : /* @__PURE__ */ _jsxDEV("p", { children: "No active selection" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 872,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 862,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 807,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 662,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("footer", {
				className: "app-footer",
				children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("strong", { children: "MDDS Address API" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 880,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("p", { children: "Designed and developed by Utsab Sinha." }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 881,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 879,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("p", { children: "2026. Hierarchical address intelligence for India." }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 883,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 878,
				columnNumber: 7
			}, this),
			isCopied && /* @__PURE__ */ _jsxDEV(Toast, { message: "Copied to clipboard" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 886,
				columnNumber: 20
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 636,
		columnNumber: 5
	}, this);
}
_s2(App, "7ly/qTQgcbgOjvBmaFc+WHd8nwQ=");
_c6 = App;
export default App;
var _c, _c2, _c3, _c4, _c5, _c6;
$RefreshReg$(_c, "Skeleton");
$RefreshReg$(_c2, "SearchResultSkeleton");
$RefreshReg$(_c3, "VillageDetailsSkeleton");
$RefreshReg$(_c4, "Toast");
$RefreshReg$(_c5, "AnalyticsDashboard");
$RefreshReg$(_c6, "App");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/App.jsx?t=1780415169149";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/Utsab Sinha/Downloads/mdds-address-api/mdds-address-api/frontend/src/App.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/Utsab Sinha/Downloads/mdds-address-api/mdds-address-api/frontend/src/App.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/Utsab Sinha/Downloads/mdds-address-api/mdds-address-api/frontend/src/App.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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LFNBQVE7WUFBWSxNQUFLO1lBQU8sUUFBTztZQUFlLGFBQVk7WUFBSSxlQUFjO1lBQVEsT0FBTzthQUFFLE9BQU87YUFBSSxRQUFRO1lBQUc7c0JBQ2xKLHdCQUFDLFFBQUQsRUFBTSxHQUFFLDZCQUE4Qjs7Ozs7V0FDbkM7Ozs7cUJBQUMsZ0JBRUY7Ozs7O3FCQUVOO1NBRUk7Ozs7aUJBQ0w7Ozs7OztPQUNFOzs7OztpQkFFVCx3QkFBQyxXQUFEO09BQVMsV0FBVTtpQkFBbkI7UUFDRSx3QkFBQyxRQUFEO1NBQU0sV0FBVTttQkFBaUI7UUFBYTs7Ozs7UUFDOUMsd0JBQUMsTUFBRCxZQUFJLDBDQUEyQzs7Ozs7UUFDL0Msd0JBQUMsS0FBRCxZQUFHLDBHQUdBOzs7OztPQUNJOzs7OztnQkFHWCx3QkFBQyxPQUFEO09BQUssV0FBVTtpQkFBZixDQUNFLHdCQUFDLE1BQUQsWUFBSSxlQUFnQjs7OztpQkFDbkIsZ0JBQ0Msd0JBQUMsS0FBRDtRQUFHO1FBQ1E7UUFDUixvQkFBb0IsTUFBTTtRQUMxQix1QkFBdUIsTUFBTTtRQUM3QixtQkFBbUIsTUFBTTtPQUN6Qjs7OztrQkFFSCx3QkFBQyxLQUFELFlBQUcsc0JBQXNCOzs7O2VBRXhCOzs7OztjQUNGOzs7Ozs7SUFDRTs7Ozs7O0dBRVQsd0JBQUMsVUFBRDtJQUFRLFdBQVU7Y0FBbEIsQ0FDRSx3QkFBQyxPQUFELGFBQ0Usd0JBQUMsVUFBRCxZQUFRLG1CQUF3Qjs7OztjQUNoQyx3QkFBQyxLQUFELFlBQUcseUNBQXlDOzs7O1lBQ3pDOzs7O2NBQ0wsd0JBQUMsS0FBRCxZQUFHLHFEQUFxRDs7OztZQUNsRDs7Ozs7O0dBRVAsWUFBWSx3QkFBQyxPQUFELEVBQU8sU0FBUSxzQkFBdUI7Ozs7O0VBQy9DOzs7Ozs7QUFFVjs7O0FBRUEsZUFBZSIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJBcHAuanN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBTZWxlY3QgZnJvbSBcInJlYWN0LXNlbGVjdFwiO1xuaW1wb3J0IENvdW50VXAgZnJvbSBcInJlYWN0LWNvdW50dXBcIjtcblxuLy8gRGVidWc6IGxvZyBpbXBvcnRlZCBjb21wb25lbnQgc2hhcGVzIHRvIGhlbHAgaWRlbnRpZnkgaW52YWxpZCBlbGVtZW50IHR5cGVzXG50cnkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICBjb25zb2xlLmRlYnVnKFwicmVhY3Qtc2VsZWN0IGltcG9ydDpcIiwgU2VsZWN0KTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgY29uc29sZS5kZWJ1ZyhcInJlYWN0LWNvdW50dXAgaW1wb3J0OlwiLCBDb3VudFVwKTtcbn0gY2F0Y2ggKGUpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgY29uc29sZS5lcnJvcihcIkVycm9yIGxvZ2dpbmcgaW1wb3J0czpcIiwgZSk7XG59XG5pbXBvcnQgXCIuL0FwcC5jc3NcIjtcblxuY29uc3QgQVBJX0JBU0VfVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxXCI7XG5cbmNvbnN0IG5vcm1hbGl6ZU5hbWUgPSAobmFtZSA9IFwiXCIpID0+XG4gIG5hbWVcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5yZXBsYWNlKC8mL2csIFwiYW5kXCIpXG4gICAgLnJlcGxhY2UoL18vZywgXCIgXCIpXG4gICAgLnJlcGxhY2UoL1xccysvZywgXCIgXCIpXG4gICAgLnRyaW0oKTtcblxuY29uc3QgU2tlbGV0b24gPSAoeyBjbGFzc05hbWUgPSBcIlwiLCBzdHlsZSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtgc2tlbGV0b24gJHtjbGFzc05hbWV9YH0gc3R5bGU9e3N0eWxlfSAvPlxuKTtcblxuY29uc3QgU2VhcmNoUmVzdWx0U2tlbGV0b24gPSAoKSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0cy1zdGFja1wiPlxuICAgIHtbLi4uQXJyYXkoMyldLm1hcCgoXywgaSkgPT4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHQtY2FyZCBpcy1sb2FkaW5nXCIga2V5PXtpfT5cbiAgICAgICAgPFNrZWxldG9uIHN0eWxlPXt7IGhlaWdodDogMTgsIHdpZHRoOiBcIjQ4JVwiIH19IC8+XG4gICAgICAgIDxTa2VsZXRvbiBzdHlsZT17eyBoZWlnaHQ6IDE0LCB3aWR0aDogXCI4MiVcIiB9fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKSl9XG4gIDwvZGl2PlxuKTtcblxuY29uc3QgVmlsbGFnZURldGFpbHNTa2VsZXRvbiA9ICgpID0+IChcbiAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZGV0YWlscy1jYXJkXCI+XG4gICAgPFNrZWxldG9uIHN0eWxlPXt7IGhlaWdodDogMTgsIHdpZHRoOiBcIjM1JVwiIH19IC8+XG4gICAgPFNrZWxldG9uIHN0eWxlPXt7IGhlaWdodDogMzQsIHdpZHRoOiBcIjcwJVwiIH19IC8+XG4gICAgPFNrZWxldG9uIHN0eWxlPXt7IGhlaWdodDogMTYsIHdpZHRoOiBcIjkwJVwiIH19IC8+XG4gICAgPFNrZWxldG9uIHN0eWxlPXt7IGhlaWdodDogNTgsIHdpZHRoOiBcIjEwMCVcIiB9fSAvPlxuICAgIDxTa2VsZXRvbiBzdHlsZT17eyBoZWlnaHQ6IDQ0LCB3aWR0aDogXCIxMDAlXCIgfX0gLz5cbiAgPC9zZWN0aW9uPlxuKTtcblxuY29uc3QgVG9hc3QgPSAoeyBtZXNzYWdlIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJ0b2FzdFwiIHJvbGU9XCJzdGF0dXNcIj5cbiAgICB7bWVzc2FnZX1cbiAgPC9kaXY+XG4pO1xuXG4vLyBBbmFseXRpY3MgRGFzaGJvYXJkIENvbXBvbmVudFxuY29uc3QgQW5hbHl0aWNzRGFzaGJvYXJkID0gKHsgc2VhcmNoSGlzdG9yeSwgcmVjZW50U2VhcmNoZXMgfSkgPT4ge1xuICBjb25zdCBbZXhwb3J0Rm9ybWF0LCBzZXRFeHBvcnRGb3JtYXRdID0gdXNlU3RhdGUoXCJjc3ZcIik7XG4gIGNvbnN0IFtzaG93RXhwb3J0TW9kYWwsIHNldFNob3dFeHBvcnRNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgZ2V0VG9wU2VhcmNoZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgZnJlcSA9IHt9O1xuICAgIHNlYXJjaEhpc3RvcnkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgZnJlcVtpdGVtXSA9IChmcmVxW2l0ZW1dIHx8IDApICsgMTtcbiAgICB9KTtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoZnJlcSlcbiAgICAgIC5zb3J0KChbLCBhXSwgWywgYl0pID0+IGIgLSBhKVxuICAgICAgLnNsaWNlKDAsIDUpXG4gICAgICAubWFwKChbcXVlcnksIGNvdW50XSkgPT4gKHsgcXVlcnksIGNvdW50IH0pKTtcbiAgfTtcblxuICBjb25zdCBleHBvcnRTZWFyY2hIaXN0b3J5ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBleHBvcnREYXRlOiBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCksXG4gICAgICB0b3RhbFNlYXJjaGVzOiBzZWFyY2hIaXN0b3J5Lmxlbmd0aCxcbiAgICAgIHVuaXF1ZVF1ZXJpZXM6IG5ldyBTZXQoc2VhcmNoSGlzdG9yeSkuc2l6ZSxcbiAgICAgIHRvcFNlYXJjaGVzOiBnZXRUb3BTZWFyY2hlcygpLFxuICAgICAgcmVjZW50U2VhcmNoZXM6IHJlY2VudFNlYXJjaGVzLnNsaWNlKDAsIDIwKSxcbiAgICB9O1xuXG4gICAgbGV0IGNvbnRlbnQsIGZpbGVuYW1lLCB0eXBlO1xuXG4gICAgaWYgKGV4cG9ydEZvcm1hdCA9PT0gXCJjc3ZcIikge1xuICAgICAgY29uc3QgaGVhZGVycyA9IFtcIlF1ZXJ5XCIsIFwiQ291bnRcIl07XG4gICAgICBjb25zdCByb3dzID0gZ2V0VG9wU2VhcmNoZXMoKS5tYXAoKHsgcXVlcnksIGNvdW50IH0pID0+IFtxdWVyeSwgY291bnRdKTtcbiAgICAgIGNvbnRlbnQgPSBbaGVhZGVycywgLi4ucm93c10ubWFwKChyb3cpID0+IHJvdy5qb2luKFwiLFwiKSkuam9pbihcIlxcblwiKTtcbiAgICAgIGZpbGVuYW1lID0gXCJhbmFseXRpY3MuY3N2XCI7XG4gICAgICB0eXBlID0gXCJ0ZXh0L2NzdlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gICAgICBmaWxlbmFtZSA9IFwiYW5hbHl0aWNzLmpzb25cIjtcbiAgICAgIHR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbiAgICB9XG5cbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NvbnRlbnRdLCB7IHR5cGUgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICBzZXRTaG93RXhwb3J0TW9kYWwoZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IHRvcFNlYXJjaGVzID0gZ2V0VG9wU2VhcmNoZXMoKTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFuYWx5dGljcy1zZWN0aW9uXCIgYXJpYS1sYWJlbD1cIlVzYWdlIGFuYWx5dGljc1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbmFseXRpY3MtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5hbHl0aWNzLWhlYWRlclwiPlxuICAgICAgICAgIDxoMj5BbmFseXRpY3MgJiBJbnNpZ2h0czwvaDI+XG4gICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdob3N0LWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RXhwb3J0TW9kYWwodHJ1ZSl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDwn5OKIEV4cG9ydCBEYXRhXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5hbHl0aWNzLWdyaWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuYWx5dGljcy1jYXJkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuYWx5dGljcy1zdGF0XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0YXQtdmFsdWVcIj57c2VhcmNoSGlzdG9yeS5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdGF0LWxhYmVsXCI+VG90YWwgU2VhcmNoZXM8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5hbHl0aWNzLWNhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5hbHl0aWNzLXN0YXRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhdC12YWx1ZVwiPntuZXcgU2V0KHNlYXJjaEhpc3RvcnkpLnNpemV9PC9zcGFuPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdGF0LWxhYmVsXCI+VW5pcXVlIFF1ZXJpZXM8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5hbHl0aWNzLWNhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5hbHl0aWNzLXN0YXRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhdC12YWx1ZVwiPntyZWNlbnRTZWFyY2hlcy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdGF0LWxhYmVsXCI+UmVjZW50IFJlY29yZHM8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5hbHl0aWNzLWNhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5hbHl0aWNzLXN0YXRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhdC12YWx1ZVwiPiZsdDsxMDBtczwvc3Bhbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3RhdC1sYWJlbFwiPkF2ZyBSZXNwb25zZTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyZW5kaW5nLXNlY3Rpb25cIj5cbiAgICAgICAgICA8aDM+VG9wIFNlYXJjaGVkIFZpbGxhZ2VzPC9oMz5cbiAgICAgICAgICB7dG9wU2VhcmNoZXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJlbmRpbmctbGlzdFwiPlxuICAgICAgICAgICAgICB7dG9wU2VhcmNoZXMubWFwKChpdGVtLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJ0cmVuZGluZy1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cmVuZGluZy1yYW5rXCI+I3tpZHggKyAxfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyZW5kaW5nLW5hbWVcIj57aXRlbS5xdWVyeX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cmVuZGluZy1jb3VudFwiPntpdGVtLmNvdW50fSBzZWFyY2hlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZW1wdHktc3RhdGVcIj5ObyBzZWFyY2ggaGlzdG9yeSB5ZXQ8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge3Nob3dFeHBvcnRNb2RhbCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBvcnQtbW9kYWwtb3ZlcmxheVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dFeHBvcnRNb2RhbChmYWxzZSl9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBvcnQtbW9kYWxcIiBvbkNsaWNrPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgICAgICAgIDxoMz5FeHBvcnQgQW5hbHl0aWNzIERhdGE8L2gzPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1hdC1zZWxlY3RvclwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCIgXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPVwiY3N2XCIgXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2V4cG9ydEZvcm1hdCA9PT0gXCJjc3ZcIn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFeHBvcnRGb3JtYXQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIENTViBGb3JtYXRcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCIgXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPVwianNvblwiIFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtleHBvcnRGb3JtYXQgPT09IFwianNvblwifVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEV4cG9ydEZvcm1hdChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgSlNPTiBGb3JtYXRcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJnaG9zdC1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RXhwb3J0TW9kYWwoZmFsc2UpfT5cbiAgICAgICAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJpbWFyeS1idXR0b25cIiBvbkNsaWNrPXtleHBvcnRTZWFyY2hIaXN0b3J5fT5cbiAgICAgICAgICAgICAgICAgIEV4cG9ydFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCBbc3RhdGVzLCBzZXRTdGF0ZXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbZGlzdHJpY3RzLCBzZXREaXN0cmljdHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc3ViRGlzdHJpY3RzLCBzZXRTdWJEaXN0cmljdHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbdmlsbGFnZXMsIHNldFZpbGxhZ2VzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3ZpbGxhZ2VEZXRhaWxzLCBzZXRWaWxsYWdlRGV0YWlsc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcblxuICBjb25zdCBbc3RhdHMsIHNldFN0YXRzXSA9IHVzZVN0YXRlKHtcbiAgICBzdGF0ZXM6IDAsXG4gICAgZGlzdHJpY3RzOiAwLFxuICAgIHN1YkRpc3RyaWN0czogMCxcbiAgICB2aWxsYWdlczogMFxuICB9KTtcblxuICBjb25zdCBbYW5hbHl0aWNzLCBzZXRBbmFseXRpY3NdID0gdXNlU3RhdGUoe1xuICAgIHRvdGFsU2VhcmNoZXM6IDAsXG4gICAgdW5pcXVlUXVlcmllczogMCxcbiAgICByZWNlbnRSZWNvcmRzOiAwLFxuICAgIGF2Z1Jlc3BvbnNlOiBcIjwxMDBtc1wiXG4gIH0pO1xuXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzZWFyY2hSZXN1bHRzLCBzZXRTZWFyY2hSZXN1bHRzXSA9IHVzZVN0YXRlKFtdKTtcblxuICBjb25zdCBbZGlzdHJpY3RzTG9hZGluZywgc2V0RGlzdHJpY3RzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdWJEaXN0cmljdHNMb2FkaW5nLCBzZXRTdWJEaXN0cmljdHNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3ZpbGxhZ2VzTG9hZGluZywgc2V0VmlsbGFnZXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3ZpbGxhZ2VEZXRhaWxzTG9hZGluZywgc2V0VmlsbGFnZURldGFpbHNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NlYXJjaExvYWRpbmcsIHNldFNlYXJjaExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IFtzZWxlY3RlZFN0YXRlLCBzZXRTZWxlY3RlZFN0YXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2VsZWN0ZWREaXN0cmljdCwgc2V0U2VsZWN0ZWREaXN0cmljdF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3NlbGVjdGVkU3ViRGlzdHJpY3QsIHNldFNlbGVjdGVkU3ViRGlzdHJpY3RdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtzZWxlY3RlZFZpbGxhZ2UsIHNldFNlbGVjdGVkVmlsbGFnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2lzQ29waWVkLCBzZXRJc0NvcGllZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0Rvd25sb2FkaW5nLCBzZXRJc0Rvd25sb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgXG4gIC8vIEFuYWx5dGljcyBzdGF0ZVxuICBjb25zdCBbc2VhcmNoSGlzdG9yeSwgc2V0U2VhcmNoSGlzdG9yeV0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtyZWNlbnRTZWFyY2hlcywgc2V0UmVjZW50U2VhcmNoZXNdID0gdXNlU3RhdGUoW10pO1xuXG4gIGNvbnN0IHNlbGVjdFN0eWxlcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGNvbnRyb2w6IChiYXNlLCBzdGF0ZSkgPT4gKHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgbWluSGVpZ2h0OiA1MixcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAxNCxcbiAgICAgICAgYmFja2dyb3VuZDogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSlcIixcbiAgICAgICAgYm9yZGVyQ29sb3I6IHN0YXRlLmlzRm9jdXNlZCA/IFwiIzI1NjNlYlwiIDogXCJyZ2JhKDE1LCAyMywgNDIsIDAuMTIpXCIsXG4gICAgICAgIGJveFNoYWRvdzogc3RhdGUuaXNGb2N1c2VkXG4gICAgICAgICAgPyBcIjAgMCAwIDRweCByZ2JhKDM3LCA5OSwgMjM1LCAwLjE0KVwiXG4gICAgICAgICAgOiBcIjAgMTRweCAzMnB4IHJnYmEoMTUsIDIzLCA0MiwgMC4wOClcIixcbiAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcbiAgICAgICAgdHJhbnNpdGlvbjogXCJib3JkZXItY29sb3IgMTYwbXMgZWFzZSwgYm94LXNoYWRvdyAxNjBtcyBlYXNlXCIsXG4gICAgICAgIFwiJjpob3ZlclwiOiB7XG4gICAgICAgICAgYm9yZGVyQ29sb3I6IHN0YXRlLmlzRm9jdXNlZCA/IFwiIzI1NjNlYlwiIDogXCJyZ2JhKDE1LCAyMywgNDIsIDAuMjQpXCIsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIGNvbnRhaW5lcjogKGJhc2UpID0+ICh7IC4uLmJhc2UsIHdpZHRoOiBcIjEwMCVcIiB9KSxcbiAgICAgIG1lbnU6IChiYXNlKSA9PiAoe1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBib3JkZXJSYWRpdXM6IDE0LFxuICAgICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcbiAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCByZ2JhKDE1LCAyMywgNDIsIDAuMSlcIixcbiAgICAgICAgYm94U2hhZG93OiBcIjAgMjRweCA3MHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4xOClcIixcbiAgICAgICAgekluZGV4OiAyMCxcbiAgICAgIH0pLFxuICAgICAgbWVudUxpc3Q6IChiYXNlKSA9PiAoeyAuLi5iYXNlLCBwYWRkaW5nOiA2IH0pLFxuICAgICAgb3B0aW9uOiAoYmFzZSwgc3RhdGUpID0+ICh7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIGJvcmRlclJhZGl1czogMTAsXG4gICAgICAgIGNvbG9yOiBcIiMwZjE3MmFcIixcbiAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzdGF0ZS5pc1NlbGVjdGVkXG4gICAgICAgICAgPyBcInJnYmEoMzcsIDk5LCAyMzUsIDAuMTYpXCJcbiAgICAgICAgICA6IHN0YXRlLmlzRm9jdXNlZFxuICAgICAgICAgICAgPyBcInJnYmEoMjAsIDE4NCwgMTY2LCAwLjEyKVwiXG4gICAgICAgICAgICA6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgIH0pLFxuICAgICAgcGxhY2Vob2xkZXI6IChiYXNlKSA9PiAoeyAuLi5iYXNlLCBjb2xvcjogXCIjNjQ3NDhiXCIgfSksXG4gICAgICBzaW5nbGVWYWx1ZTogKGJhc2UpID0+ICh7IC4uLmJhc2UsIGNvbG9yOiBcIiMwZjE3MmFcIiwgZm9udFdlaWdodDogNzAwIH0pLFxuICAgICAgaW5wdXQ6IChiYXNlKSA9PiAoeyAuLi5iYXNlLCBjb2xvcjogXCIjMGYxNzJhXCIgfSksXG4gICAgICBpbmRpY2F0b3JTZXBhcmF0b3I6IChiYXNlKSA9PiAoeyAuLi5iYXNlLCBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgxNSwgMjMsIDQyLCAwLjEpXCIgfSksXG4gICAgICBkcm9wZG93bkluZGljYXRvcjogKGJhc2UsIHN0YXRlKSA9PiAoe1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBjb2xvcjogc3RhdGUuaXNGb2N1c2VkID8gXCIjMjU2M2ViXCIgOiBcIiM2NDc0OGJcIixcbiAgICAgIH0pLFxuICAgIH0pLFxuICAgIFtdLFxuICApO1xuXG4gIGNvbnN0IHN0YXRlT3B0aW9ucyA9IHN0YXRlcy5tYXAoKHN0YXRlKSA9PiAoeyB2YWx1ZTogc3RhdGUuY29kZSwgbGFiZWw6IHN0YXRlLm5hbWUgfSkpO1xuICBjb25zdCBzdGF0ZVNlYXJjaFJlc3VsdHMgPVxuICAgIHF1ZXJ5Lmxlbmd0aCA+PSAyXG4gICAgICA/IHN0YXRlT3B0aW9ucy5maWx0ZXIoKHN0YXRlKSA9PiBub3JtYWxpemVOYW1lKHN0YXRlLmxhYmVsKS5pbmNsdWRlcyhub3JtYWxpemVOYW1lKHF1ZXJ5KSkpLnNsaWNlKDAsIDYpXG4gICAgICA6IFtdO1xuICBjb25zdCBkaXN0cmljdE9wdGlvbnMgPSBkaXN0cmljdHMubWFwKChkaXN0cmljdCkgPT4gKHtcbiAgICB2YWx1ZTogZGlzdHJpY3QuY29kZSxcbiAgICBsYWJlbDogZGlzdHJpY3QuZGlzdHJpY3QsXG4gIH0pKTtcbiAgY29uc3Qgc3ViRGlzdHJpY3RPcHRpb25zID0gc3ViRGlzdHJpY3RzLm1hcCgoc3ViRGlzdHJpY3QpID0+ICh7XG4gICAgdmFsdWU6IHN1YkRpc3RyaWN0LmNvZGUsXG4gICAgbGFiZWw6IHN1YkRpc3RyaWN0LnN1YkRpc3RyaWN0LFxuICB9KSk7XG4gIGNvbnN0IHZpbGxhZ2VPcHRpb25zID0gdmlsbGFnZXMubWFwKCh2aWxsYWdlKSA9PiAoe1xuICAgIHZhbHVlOiB2aWxsYWdlLmNvZGUsXG4gICAgbGFiZWw6IHZpbGxhZ2UudmlsbGFnZSxcbiAgfSkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGNvbnN0IHRpbWVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldFNlYXJjaExvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvcihudWxsKTtcblxuICAgICAgYXhpb3NcbiAgICAgICAgLmdldChgJHtBUElfQkFTRV9VUkx9L3NlYXJjaD9xPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KX1gLCB7XG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIHNldFNlYXJjaFJlc3VsdHMocmVzLmRhdGEpO1xuICAgICAgICAgIC8vIFRyYWNrIHNlYXJjaCBoaXN0b3J5XG4gICAgICAgICAgc2V0U2VhcmNoSGlzdG9yeSgocHJldikgPT4gWy4uLnByZXYsIHF1ZXJ5XSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgaWYgKCFheGlvcy5pc0NhbmNlbChlcnIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2VhcmNoIGZhaWxlZDpcIiwgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKFwiU2VhcmNoIGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgICAgICBzZXRTZWFyY2hSZXN1bHRzKFtdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5maW5hbGx5KCgpID0+IHNldFNlYXJjaExvYWRpbmcoZmFsc2UpKTtcbiAgICB9LCAzMDApO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB9O1xuICB9LCBbcXVlcnldKTtcblxuICBjb25zdCBsb2FkRnVsbEFkZHJlc3NCeUNvZGVzID0gYXN5bmMgKGNvZGVzKSA9PiB7XG4gICAgc2V0RGlzdHJpY3RzTG9hZGluZyh0cnVlKTtcbiAgICBzZXRTdWJEaXN0cmljdHNMb2FkaW5nKHRydWUpO1xuICAgIHNldFZpbGxhZ2VzTG9hZGluZyh0cnVlKTtcbiAgICBzZXRWaWxsYWdlRGV0YWlsc0xvYWRpbmcodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgW2Rpc3RyaWN0c1Jlcywgc3ViRGlzdHJpY3RzUmVzLCB2aWxsYWdlc1JlcywgdmlsbGFnZURldGFpbHNSZXNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBheGlvcy5nZXQoYCR7QVBJX0JBU0VfVVJMfS9kaXN0cmljdHMvJHtjb2Rlcy5zdGF0ZUNvZGV9YCksXG4gICAgICAgIGF4aW9zLmdldChgJHtBUElfQkFTRV9VUkx9L3N1YmRpc3RyaWN0cy8ke2NvZGVzLmRpc3RyaWN0Q29kZX1gKSxcbiAgICAgICAgYXhpb3MuZ2V0KGAke0FQSV9CQVNFX1VSTH0vdmlsbGFnZXMvJHtjb2Rlcy5zdWJEaXN0cmljdENvZGV9YCksXG4gICAgICAgIGF4aW9zLmdldChgJHtBUElfQkFTRV9VUkx9L3ZpbGxhZ2UvJHtjb2Rlcy52aWxsYWdlQ29kZX1gKSxcbiAgICAgIF0pO1xuXG4gICAgICBzZXREaXN0cmljdHMoZGlzdHJpY3RzUmVzLmRhdGEpO1xuICAgICAgc2V0U3ViRGlzdHJpY3RzKHN1YkRpc3RyaWN0c1Jlcy5kYXRhKTtcbiAgICAgIHNldFZpbGxhZ2VzKHZpbGxhZ2VzUmVzLmRhdGEpO1xuICAgICAgc2V0VmlsbGFnZURldGFpbHModmlsbGFnZURldGFpbHNSZXMuZGF0YSk7XG5cbiAgICAgIHNldFNlbGVjdGVkU3RhdGUoY29kZXMuc3RhdGVDb2RlKTtcbiAgICAgIHNldFNlbGVjdGVkRGlzdHJpY3QoY29kZXMuZGlzdHJpY3RDb2RlKTtcbiAgICAgIHNldFNlbGVjdGVkU3ViRGlzdHJpY3QoY29kZXMuc3ViRGlzdHJpY3RDb2RlKTtcbiAgICAgIHNldFNlbGVjdGVkVmlsbGFnZShjb2Rlcy52aWxsYWdlQ29kZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGF1dG8tZmlsbCBhZGRyZXNzOlwiLCBlcnIpO1xuICAgICAgc2V0RXJyb3IoXCJDb3VsZCBub3QgbG9hZCB0aGUgZnVsbCBhZGRyZXNzLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgIGhhbmRsZUNsZWFyKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldERpc3RyaWN0c0xvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0U3ViRGlzdHJpY3RzTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRWaWxsYWdlc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0VmlsbGFnZURldGFpbHNMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbG9hZFN0YXRzID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9zdGF0c1wiXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgICBzZXRTdGF0cyhkYXRhKTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiU3RhdHMgRXJyb3I6XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaEluaXRpYWxEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGVzUmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAke0FQSV9CQVNFX1VSTH0vc3RhdGVzYCk7XG4gICAgICBzZXRTdGF0ZXMoc3RhdGVzUmVzLmRhdGEpO1xuICAgICAgY29uc3Qgc2F2ZWRBZGRyZXNzSlNPTiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2VsZWN0ZWRBZGRyZXNzXCIpO1xuICAgICAgaWYgKHNhdmVkQWRkcmVzc0pTT04pIHtcbiAgICAgICAgYXdhaXQgbG9hZEZ1bGxBZGRyZXNzQnlDb2RlcyhKU09OLnBhcnNlKHNhdmVkQWRkcmVzc0pTT04pKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZldGNoSW5pdGlhbERhdGEoKS5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICBsb2FkU3RhdHMoKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHZpbGxhZ2VEZXRhaWxzICYmIHNlbGVjdGVkVmlsbGFnZSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRBZGRyZXNzID0ge1xuICAgICAgICBzdGF0ZUNvZGU6IHNlbGVjdGVkU3RhdGUsXG4gICAgICAgIGRpc3RyaWN0Q29kZTogc2VsZWN0ZWREaXN0cmljdCxcbiAgICAgICAgc3ViRGlzdHJpY3RDb2RlOiBzZWxlY3RlZFN1YkRpc3RyaWN0LFxuICAgICAgICB2aWxsYWdlQ29kZTogc2VsZWN0ZWRWaWxsYWdlLFxuICAgICAgfTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2VsZWN0ZWRBZGRyZXNzXCIsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkQWRkcmVzcykpO1xuICAgIH0gZWxzZSBpZiAoIXNlbGVjdGVkVmlsbGFnZSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNlbGVjdGVkQWRkcmVzc1wiKSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJzZWxlY3RlZEFkZHJlc3NcIik7XG4gICAgfVxuICB9LCBbdmlsbGFnZURldGFpbHMsIHNlbGVjdGVkU3RhdGUsIHNlbGVjdGVkRGlzdHJpY3QsIHNlbGVjdGVkU3ViRGlzdHJpY3QsIHNlbGVjdGVkVmlsbGFnZV0pO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGxvYWREaXN0cmljdHMoc3RhdGVDb2RlKSB7XG4gICAgc2V0U2VsZWN0ZWRTdGF0ZShzdGF0ZUNvZGUpO1xuICAgIHNldERpc3RyaWN0cyhbXSk7XG4gICAgc2V0U3ViRGlzdHJpY3RzKFtdKTtcbiAgICBzZXRWaWxsYWdlcyhbXSk7XG4gICAgc2V0VmlsbGFnZURldGFpbHMobnVsbCk7XG4gICAgc2V0U2VsZWN0ZWREaXN0cmljdChcIlwiKTtcbiAgICBzZXRTZWxlY3RlZFN1YkRpc3RyaWN0KFwiXCIpO1xuICAgIHNldFNlbGVjdGVkVmlsbGFnZShcIlwiKTtcbiAgICBzZXRFcnJvcihudWxsKTtcblxuICAgIGlmICghc3RhdGVDb2RlKSByZXR1cm47XG5cbiAgICBzZXREaXN0cmljdHNMb2FkaW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoYCR7QVBJX0JBU0VfVVJMfS9kaXN0cmljdHMvJHtzdGF0ZUNvZGV9YCk7XG4gICAgICBzZXREaXN0cmljdHMocmVzLmRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGRpc3RyaWN0czpcIiwgZXJyKTtcbiAgICAgIHNldEVycm9yKFwiQ291bGQgbm90IGxvYWQgZGlzdHJpY3RzLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0RGlzdHJpY3RzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gbG9hZFN1YkRpc3RyaWN0cyhkaXN0cmljdENvZGUpIHtcbiAgICBzZXRTZWxlY3RlZERpc3RyaWN0KGRpc3RyaWN0Q29kZSk7XG4gICAgc2V0U3ViRGlzdHJpY3RzKFtdKTtcbiAgICBzZXRWaWxsYWdlcyhbXSk7XG4gICAgc2V0VmlsbGFnZURldGFpbHMobnVsbCk7XG4gICAgc2V0U2VsZWN0ZWRTdWJEaXN0cmljdChcIlwiKTtcbiAgICBzZXRTZWxlY3RlZFZpbGxhZ2UoXCJcIik7XG4gICAgc2V0RXJyb3IobnVsbCk7XG5cbiAgICBpZiAoIWRpc3RyaWN0Q29kZSkgcmV0dXJuO1xuXG4gICAgc2V0U3ViRGlzdHJpY3RzTG9hZGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAke0FQSV9CQVNFX1VSTH0vc3ViZGlzdHJpY3RzLyR7ZGlzdHJpY3RDb2RlfWApO1xuICAgICAgc2V0U3ViRGlzdHJpY3RzKHJlcy5kYXRhKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBzdWItZGlzdHJpY3RzOlwiLCBlcnIpO1xuICAgICAgc2V0RXJyb3IoXCJDb3VsZCBub3QgbG9hZCBzdWItZGlzdHJpY3RzLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0U3ViRGlzdHJpY3RzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gbG9hZFZpbGxhZ2VzKHN1YkRpc3RyaWN0Q29kZSkge1xuICAgIHNldFNlbGVjdGVkU3ViRGlzdHJpY3Qoc3ViRGlzdHJpY3RDb2RlKTtcbiAgICBzZXRWaWxsYWdlcyhbXSk7XG4gICAgc2V0VmlsbGFnZURldGFpbHMobnVsbCk7XG4gICAgc2V0U2VsZWN0ZWRWaWxsYWdlKFwiXCIpO1xuICAgIHNldEVycm9yKG51bGwpO1xuXG4gICAgaWYgKCFzdWJEaXN0cmljdENvZGUpIHJldHVybjtcblxuICAgIHNldFZpbGxhZ2VzTG9hZGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAke0FQSV9CQVNFX1VSTH0vdmlsbGFnZXMvJHtzdWJEaXN0cmljdENvZGV9YCk7XG4gICAgICBzZXRWaWxsYWdlcyhyZXMuZGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgdmlsbGFnZXM6XCIsIGVycik7XG4gICAgICBzZXRFcnJvcihcIkNvdWxkIG5vdCBsb2FkIHZpbGxhZ2VzLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0VmlsbGFnZXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBsb2FkVmlsbGFnZURldGFpbHModmlsbGFnZUNvZGUpIHtcbiAgICBzZXRTZWxlY3RlZFZpbGxhZ2UodmlsbGFnZUNvZGUpO1xuICAgIHNldEVycm9yKG51bGwpO1xuXG4gICAgaWYgKCF2aWxsYWdlQ29kZSkge1xuICAgICAgc2V0VmlsbGFnZURldGFpbHMobnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0VmlsbGFnZURldGFpbHNMb2FkaW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoYCR7QVBJX0JBU0VfVVJMfS92aWxsYWdlLyR7dmlsbGFnZUNvZGV9YCk7XG4gICAgICBzZXRWaWxsYWdlRGV0YWlscyhyZXMuZGF0YSk7XG4gICAgICAvLyBUcmFjayByZWNlbnQgc2VhcmNoXG4gICAgICBzZXRSZWNlbnRTZWFyY2hlcygocHJldikgPT4gW1xuICAgICAgICB7IFxuICAgICAgICAgIHZpbGxhZ2U6IHJlcy5kYXRhLnZpbGxhZ2UsIFxuICAgICAgICAgIGNvZGU6IHJlcy5kYXRhLmNvZGUsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpXG4gICAgICAgIH0sXG4gICAgICAgIC4uLnByZXYuc2xpY2UoMCwgMTkpXG4gICAgICBdKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCB2aWxsYWdlIGRldGFpbHM6XCIsIGVycik7XG4gICAgICBzZXRFcnJvcihcIkNvdWxkIG5vdCBsb2FkIHZpbGxhZ2UgZGV0YWlscy4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFZpbGxhZ2VEZXRhaWxzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaGFuZGxlU2VhcmNoUmVzdWx0Q2xpY2sgPSBhc3luYyAoaXRlbSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN0YXRlU2VhcmNoQ2xpY2sgPSBhc3luYyAoc3RhdGVDb2RlKSA9PiB7XG4gICAgc2V0UXVlcnkoXCJcIik7XG4gICAgc2V0U2VhcmNoUmVzdWx0cyhbXSk7XG4gICAgc2V0RXJyb3IobnVsbCk7XG4gICAgYXdhaXQgbG9hZERpc3RyaWN0cyhzdGF0ZUNvZGUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNsZWFyID0gKCkgPT4ge1xuICAgIHNldERpc3RyaWN0cyhbXSk7XG4gICAgc2V0U3ViRGlzdHJpY3RzKFtdKTtcbiAgICBzZXRWaWxsYWdlcyhbXSk7XG4gICAgc2V0VmlsbGFnZURldGFpbHMobnVsbCk7XG4gICAgc2V0RXJyb3IobnVsbCk7XG4gICAgc2V0UXVlcnkoXCJcIik7XG4gICAgc2V0U2VhcmNoUmVzdWx0cyhbXSk7XG4gICAgc2V0U2VsZWN0ZWRTdGF0ZShcIlwiKTtcbiAgICBzZXRTZWxlY3RlZERpc3RyaWN0KFwiXCIpO1xuICAgIHNldFNlbGVjdGVkU3ViRGlzdHJpY3QoXCJcIik7XG4gICAgc2V0U2VsZWN0ZWRWaWxsYWdlKFwiXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlUb0NsaXBib2FyZCA9ICgpID0+IHtcbiAgICBpZiAoIXZpbGxhZ2VEZXRhaWxzKSByZXR1cm47XG5cbiAgICBjb25zdCBhZGRyZXNzID0gW3ZpbGxhZ2VEZXRhaWxzLnZpbGxhZ2UsIHZpbGxhZ2VEZXRhaWxzLnN1YkRpc3RyaWN0LCB2aWxsYWdlRGV0YWlscy5kaXN0cmljdCwgdmlsbGFnZURldGFpbHMuc3RhdGUsIFwiSW5kaWFcIiwgYENvZGU6ICR7dmlsbGFnZURldGFpbHMuY29kZX1gXS5qb2luKFwiXFxuXCIpO1xuXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZFxuICAgICAgLndyaXRlVGV4dChhZGRyZXNzKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBzZXRJc0NvcGllZCh0cnVlKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRJc0NvcGllZChmYWxzZSksIDIwMDApO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gY29weTogXCIsIGVycik7XG4gICAgICAgIHNldEVycm9yKFwiRmFpbGVkIHRvIGNvcHkgYWRkcmVzcyB0byBjbGlwYm9hcmQuXCIpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG93bmxvYWRKc29uID0gKCkgPT4ge1xuICAgIGlmICghdmlsbGFnZURldGFpbHMpIHJldHVybjtcbiAgICBzZXRJc0Rvd25sb2FkaW5nKHRydWUpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmlsbGFnZURldGFpbHMsIG51bGwsIDIpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtqc29uU3RyaW5nXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KTtcbiAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBhLmhyZWYgPSB1cmw7XG4gICAgICBhLmRvd25sb2FkID0gYCR7dmlsbGFnZURldGFpbHMuY29kZX0uanNvbmA7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgICAgYS5jbGljaygpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgIHNldElzRG93bmxvYWRpbmcoZmFsc2UpO1xuICAgIH0sIDYwMCk7XG4gIH07XG5cbiAgY29uc3Qgc2VsZWN0ZWRTdGF0ZU5hbWUgPSBzdGF0ZXMuZmluZCgocykgPT4gcy5jb2RlID09PSBzZWxlY3RlZFN0YXRlKT8ubmFtZTtcbiAgY29uc3Qgc2VsZWN0ZWREaXN0cmljdE5hbWUgPSBkaXN0cmljdHMuZmluZCgoZCkgPT4gZC5jb2RlID09PSBzZWxlY3RlZERpc3RyaWN0KT8uZGlzdHJpY3Q7XG4gIGNvbnN0IHNlbGVjdGVkU3ViRGlzdHJpY3ROYW1lID0gc3ViRGlzdHJpY3RzLmZpbmQoKHNkKSA9PiBzZC5jb2RlID09PSBzZWxlY3RlZFN1YkRpc3RyaWN0KT8uc3ViRGlzdHJpY3Q7XG4gIGNvbnN0IHNlbGVjdGVkVmlsbGFnZU5hbWUgPSB2aWxsYWdlcy5maW5kKCh2KSA9PiB2LmNvZGUgPT09IHNlbGVjdGVkVmlsbGFnZSk/LnZpbGxhZ2U7XG5cbiAgY29uc3QgbWV0cmljcyA9IFtcbiAgICB7XG4gICAgICB2YWx1ZTogKFxuICAgICAgICA8PlxuICAgICAgICAgIDxDb3VudFVwIGVuZD17c3RhdHMudmlsbGFnZXN9IGR1cmF0aW9uPXsyfSBzZXBhcmF0b3I9XCIsXCIgLz4rXG4gICAgICAgIDwvPlxuICAgICAgKSxcbiAgICAgIGxhYmVsOiBcIlZpbGxhZ2VzXCIsXG4gICAgICB0b25lOiBcImphZGVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHZhbHVlOiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPENvdW50VXAgZW5kPXtzdGF0cy5zdWJEaXN0cmljdHN9IGR1cmF0aW9uPXsyfSBzZXBhcmF0b3I9XCIsXCIgLz4rXG4gICAgICAgIDwvPlxuICAgICAgKSxcbiAgICAgIGxhYmVsOiBcIlN1Yi1kaXN0cmljdHNcIixcbiAgICAgIHRvbmU6IFwiYW1iZXJcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHZhbHVlOiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPENvdW50VXAgZW5kPXtzdGF0cy5kaXN0cmljdHN9IGR1cmF0aW9uPXsyfSBzZXBhcmF0b3I9XCIsXCIgLz4rXG4gICAgICAgIDwvPlxuICAgICAgKSxcbiAgICAgIGxhYmVsOiBcIkRpc3RyaWN0c1wiLFxuICAgICAgdG9uZTogXCJyb3NlXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB2YWx1ZTogPENvdW50VXAgZW5kPXtzdGF0cy5zdGF0ZXN9IGR1cmF0aW9uPXsyfSBzZXBhcmF0b3I9XCIsXCIgLz4sXG4gICAgICBsYWJlbDogXCJTdGF0ZXNcIixcbiAgICAgIHRvbmU6IFwic2t5XCIsXG4gICAgfSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT1cImFwcC1zaGVsbFwiPlxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiaGVyby1zZWN0aW9uXCIgYXJpYS1sYWJlbGxlZGJ5PVwicGFnZS10aXRsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlcm8tY29weVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV5ZWJyb3dcIj5PZmZpY2lhbCBoaWVyYXJjaHkgc2VhcmNoPC9zcGFuPlxuICAgICAgICAgIDxoMSBpZD1cInBhZ2UtdGl0bGVcIj5NRERTIEFkZHJlc3MgSW50ZWxsaWdlbmNlIFBsYXRmb3JtPC9oMT5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIEV4cGxvcmUgSW5kaWEncyBhZG1pbmlzdHJhdGl2ZSBnZW9ncmFwaHkgd2l0aCBhIGZhc3Qgc2VhcmNoIGxheWVyLFxuICAgICAgICAgICAgZ3VpZGVkIGhpZXJhcmNoeSBzZWxlY3Rpb24sIGFuZCBjbGVhbiBNRERTIHZpbGxhZ2UgcmVjb3Jkcy5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJtZXRyaWNzLWdyaWRcIiBhcmlhLWxhYmVsPVwiRGF0YXNldCBjb3ZlcmFnZVwiPlxuICAgICAgICB7bWV0cmljcy5tYXAoKG1ldHJpYykgPT4gKFxuICAgICAgICAgIDxhcnRpY2xlIGNsYXNzTmFtZT17YG1ldHJpYy1jYXJkICR7bWV0cmljLnRvbmV9YH0ga2V5PXttZXRyaWMubGFiZWx9PlxuICAgICAgICAgICAgPHNwYW4+e21ldHJpYy52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICA8cD57bWV0cmljLmxhYmVsfTwvcD5cbiAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICkpfVxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8QW5hbHl0aWNzRGFzaGJvYXJkIFxuICAgICAgICBzZWFyY2hIaXN0b3J5PXtzZWFyY2hIaXN0b3J5fSBcbiAgICAgICAgcmVjZW50U2VhcmNoZXM9e3JlY2VudFNlYXJjaGVzfVxuICAgICAgLz5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid29ya3NwYWNlLWdyaWRcIiBhcmlhLWxhYmVsPVwiQWRkcmVzcyBmaW5kZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbCBzZWFyY2gtcGFuZWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlY3Rpb24ta2lja2VyXCI+U2VhcmNoPC9zcGFuPlxuICAgICAgICAgICAgICA8aDI+RmluZCBhIHZpbGxhZ2UgaW5zdGFudGx5PC9oMj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJnaG9zdC1idXR0b25cIiBvbkNsaWNrPXtoYW5kbGVDbGVhcn0gdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICBDbGVhclxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic2VhcmNoLWZpZWxkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzZWFyY2gtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAvXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCB2aWxsYWdlIG5hbWVcIlxuICAgICAgICAgICAgICB2YWx1ZT17cXVlcnl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAge3NlYXJjaExvYWRpbmcgJiYgPFNlYXJjaFJlc3VsdFNrZWxldG9uIC8+fVxuXG4gICAgICAgICAge2Vycm9yICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdHVzLW1lc3NhZ2UgZXJyb3JcIiByb2xlPVwiYWxlcnRcIj5cbiAgICAgICAgICAgICAge2Vycm9yfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHshc2VhcmNoTG9hZGluZyAmJlxuICAgICAgICAgICAgIWVycm9yICYmXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICAgICAgc3RhdGVTZWFyY2hSZXN1bHRzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICAgICAgcXVlcnkubGVuZ3RoID49IDIgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0dXMtbWVzc2FnZVwiPk5vIHZpbGxhZ2VzIGZvdW5kIGZvciBcIntxdWVyeX1cIi48L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgeyFzZWFyY2hMb2FkaW5nICYmIChzdGF0ZVNlYXJjaFJlc3VsdHMubGVuZ3RoID4gMCB8fCBzZWFyY2hSZXN1bHRzLmxlbmd0aCA+IDApICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0cy1zdGFja1wiPlxuICAgICAgICAgICAgICB7c3RhdGVTZWFyY2hSZXN1bHRzLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlc3VsdC1jYXJkIHN0YXRlLXJlc3VsdFwiXG4gICAgICAgICAgICAgICAgICBrZXk9e2BzdGF0ZS0ke2l0ZW0udmFsdWV9YH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVN0YXRlU2VhcmNoQ2xpY2soaXRlbS52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c21hbGw+U3RhdGUgLyByZWdpb248L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHA+U2VsZWN0IHRoaXMgcmVnaW9uIGFuZCBsb2FkIGl0cyBkaXN0cmljdHMgb24gdGhlIG1hcC48L3A+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICB7c2VhcmNoUmVzdWx0cy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZXN1bHQtY2FyZFwiXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uY29kZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlYXJjaFJlc3VsdENsaWNrKGl0ZW0pfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2l0ZW0udmlsbGFnZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0uc3ViRGlzdHJpY3R9LCB7aXRlbS5kaXN0cmljdH0sIHtpdGVtLnN0YXRlfVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgc2VsZWN0b3ItcGFuZWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlY3Rpb24ta2lja2VyXCI+TmF2aWdhdG9yPC9zcGFuPlxuICAgICAgICAgICAgICA8aDI+QnVpbGQgdGhlIGFkZHJlc3MgcGF0aDwvaDI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWZsb3dcIj5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgPHNwYW4+U3RhdGU8L3NwYW4+XG4gICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICBzdHlsZXM9e3NlbGVjdFN0eWxlc31cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBzdGF0ZVwiXG4gICAgICAgICAgICAgICAgb3B0aW9ucz17c3RhdGVPcHRpb25zfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtzdGF0ZU9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IHNlbGVjdGVkU3RhdGUpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiBsb2FkRGlzdHJpY3RzKG9wdGlvbiA/IG9wdGlvbi52YWx1ZSA6IFwiXCIpfVxuICAgICAgICAgICAgICAgIGlzQ2xlYXJhYmxlXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgIDxzcGFuPkRpc3RyaWN0PC9zcGFuPlxuICAgICAgICAgICAgICB7ZGlzdHJpY3RzTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICA8U2tlbGV0b24gY2xhc3NOYW1lPVwic2VsZWN0LXNrZWxldG9uXCIgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICBzdHlsZXM9e3NlbGVjdFN0eWxlc31cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IGRpc3RyaWN0XCJcbiAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e2Rpc3RyaWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtkaXN0cmljdE9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IHNlbGVjdGVkRGlzdHJpY3QpfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhvcHRpb24pID0+IGxvYWRTdWJEaXN0cmljdHMob3B0aW9uID8gb3B0aW9uLnZhbHVlIDogXCJcIil9XG4gICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkPXshc2VsZWN0ZWRTdGF0ZX1cbiAgICAgICAgICAgICAgICAgIGlzQ2xlYXJhYmxlXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgPHNwYW4+U3ViLWRpc3RyaWN0PC9zcGFuPlxuICAgICAgICAgICAgICB7c3ViRGlzdHJpY3RzTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICA8U2tlbGV0b24gY2xhc3NOYW1lPVwic2VsZWN0LXNrZWxldG9uXCIgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICBzdHlsZXM9e3NlbGVjdFN0eWxlc31cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IHN1Yi1kaXN0cmljdFwiXG4gICAgICAgICAgICAgICAgICBvcHRpb25zPXtzdWJEaXN0cmljdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c3ViRGlzdHJpY3RPcHRpb25zLmZpbmQoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBzZWxlY3RlZFN1YkRpc3RyaWN0KX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsob3B0aW9uKSA9PiBsb2FkVmlsbGFnZXMob3B0aW9uID8gb3B0aW9uLnZhbHVlIDogXCJcIil9XG4gICAgICAgICAgICAgICAgICBpc0Rpc2FibGVkPXshc2VsZWN0ZWREaXN0cmljdH1cbiAgICAgICAgICAgICAgICAgIGlzQ2xlYXJhYmxlXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgPHNwYW4+VmlsbGFnZTwvc3Bhbj5cbiAgICAgICAgICAgICAge3ZpbGxhZ2VzTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICA8U2tlbGV0b24gY2xhc3NOYW1lPVwic2VsZWN0LXNrZWxldG9uXCIgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICBzdHlsZXM9e3NlbGVjdFN0eWxlc31cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IHZpbGxhZ2VcIlxuICAgICAgICAgICAgICAgICAgb3B0aW9ucz17dmlsbGFnZU9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dmlsbGFnZU9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IHNlbGVjdGVkVmlsbGFnZSl9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KG9wdGlvbikgPT4gbG9hZFZpbGxhZ2VEZXRhaWxzKG9wdGlvbiA/IG9wdGlvbi52YWx1ZSA6IFwiXCIpfVxuICAgICAgICAgICAgICAgICAgaXNEaXNhYmxlZD17IXNlbGVjdGVkU3ViRGlzdHJpY3R9XG4gICAgICAgICAgICAgICAgICBpc0NsZWFyYWJsZVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRldGFpbHMtY29sdW1uXCI+XG4gICAgICAgICAge3ZpbGxhZ2VEZXRhaWxzTG9hZGluZyA/IChcbiAgICAgICAgICAgIDxWaWxsYWdlRGV0YWlsc1NrZWxldG9uIC8+XG4gICAgICAgICAgKSA6IHZpbGxhZ2VEZXRhaWxzID8gKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZGV0YWlscy1jYXJkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlY3Rpb24ta2lja2VyXCI+U2VsZWN0ZWQgcmVjb3JkPC9zcGFuPlxuICAgICAgICAgICAgICA8aDI+e3ZpbGxhZ2VEZXRhaWxzLnZpbGxhZ2V9PC9oMj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRkcmVzcy1saW5lXCI+XG4gICAgICAgICAgICAgICAge3ZpbGxhZ2VEZXRhaWxzLnN1YkRpc3RyaWN0fSwge3ZpbGxhZ2VEZXRhaWxzLmRpc3RyaWN0fSwge3ZpbGxhZ2VEZXRhaWxzLnN0YXRlfVxuICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2RlLXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+TUREUyBDb2RlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+e3ZpbGxhZ2VEZXRhaWxzLmNvZGV9PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJpbWFyeS1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQ29waWVkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29weVRvQ2xpcGJvYXJkfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2lzQ29waWVkID8gXCJDb3BpZWRcIiA6IFwiQ29weSBmdWxsIGFkZHJlc3NcIn1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2Vjb25kYXJ5LWJ1dHRvblwiIFxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRKc29ufSBcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRG93bmxvYWRpbmd9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2lzRG93bmxvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6IFwiZmxleFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBnYXA6IFwiOHB4XCIsIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwic3Bpbm5lclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiM1wiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0eWxlPXt7IHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjEgMTJhOSA5IDAgMTEtNi4yMTktOC41NlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgICAgRG93bmxvYWRpbmcuLi5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgXCJEb3dubG9hZCBKU09OXCJcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJkZXRhaWxzLWNhcmQgZW1wdHktc3RhdGVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2VjdGlvbi1raWNrZXJcIj5QcmV2aWV3PC9zcGFuPlxuICAgICAgICAgICAgICA8aDI+Q2hvb3NlIGEgdmlsbGFnZSB0byBpbnNwZWN0IHRoZSByZWNvcmQuPC9oMj5cbiAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgWW91ciBzZWxlY3RlZCBNRERTIGNvZGUsIGhpZXJhcmNoeSwgYW5kIGNvcHkgYWN0aW9uIHdpbGwgYXBwZWFyXG4gICAgICAgICAgICAgICAgaGVyZSBvbmNlIHRoZSBhZGRyZXNzIHBhdGggaXMgY29tcGxldGUuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXRoLWNhcmRcIj5cbiAgICAgICAgICAgIDxoND5DdXJyZW50IFBhdGg8L2g0PlxuICAgICAgICAgICAge3NlbGVjdGVkU3RhdGUgPyAoXG4gICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIEluZGlhIOKGkiB7c2VsZWN0ZWRTdGF0ZU5hbWV9XG4gICAgICAgICAgICAgICAge3NlbGVjdGVkRGlzdHJpY3QgJiYgYCDihpIgJHtzZWxlY3RlZERpc3RyaWN0TmFtZX1gfVxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZFN1YkRpc3RyaWN0ICYmIGAg4oaSICR7c2VsZWN0ZWRTdWJEaXN0cmljdE5hbWV9YH1cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWRWaWxsYWdlICYmIGAg4oaSICR7c2VsZWN0ZWRWaWxsYWdlTmFtZX1gfVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8cD5ObyBhY3RpdmUgc2VsZWN0aW9uPC9wPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiYXBwLWZvb3RlclwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzdHJvbmc+TUREUyBBZGRyZXNzIEFQSTwvc3Ryb25nPlxuICAgICAgICAgIDxwPkRlc2lnbmVkIGFuZCBkZXZlbG9wZWQgYnkgVXRzYWIgU2luaGEuPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHA+MjAyNi4gSGllcmFyY2hpY2FsIGFkZHJlc3MgaW50ZWxsaWdlbmNlIGZvciBJbmRpYS48L3A+XG4gICAgICA8L2Zvb3Rlcj5cblxuICAgICAge2lzQ29waWVkICYmIDxUb2FzdCBtZXNzYWdlPVwiQ29waWVkIHRvIGNsaXBib2FyZFwiIC8+fVxuICAgIDwvbWFpbj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl19