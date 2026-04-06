/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, ReactNode } from "react";
import { 
  Menu, ShoppingBag, Play, Home, Package, ClipboardList, User, 
  ChevronRight, Wallet, Ticket, Star, MapPin, Headset, Settings,
  Search, Filter, Clock, Truck, CheckCircle, AlertCircle
} from "lucide-react";

// --- 数据定义 ---

const CONSTITUTIONS = [
  { 
    title: "平和质", 
    subtitle: "阴阳平衡，健康之源", 
    image: "https://images.unsplash.com/photo-1508808787069-421e7986016e?auto=format&fit=crop&q=80&w=800",
    description: "面色润泽，精力充沛，睡眠良好，胃口正常。此为中医追求的理想健康状态。",
    features: ["体形匀称健壮", "面色润泽，目光有神", "性格开朗，社会适应力强"],
    principle: "中道而行，重在维持。不宜过补，不宜过泄。",
    herbs: "五谷杂粮，应季蔬果，平和之品。",
    recommend: "固本培元饮"
  },
  { 
    title: "气虚质", 
    subtitle: "气短乏力，语声低微", 
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    description: "肌肉松软，容易疲乏，经常出汗。多因长期劳累或先天禀赋不足。",
    features: ["语声低微，懒言", "容易感冒，抗病力弱", "心悸气短，动则尤甚"],
    principle: "补气健脾，培元固本。",
    herbs: "黄芪、党参、山药、茯苓。",
    recommend: "补气参芪茶"
  },
  { 
    title: "阳虚质", 
    subtitle: "畏寒怕冷，手足不温", 
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    description: "肌肉不实，平素畏冷，手足不温，喜热饮食。多因阳气不足，温煦无力。",
    features: ["面色白，缺乏光泽", "大便溏薄，小便清长", "舌淡胖嫩，苔白滑"],
    principle: "温阳补气，祛寒化湿。",
    herbs: "干姜、肉桂、大枣、杜仲。",
    recommend: "温阳姜枣膏"
  },
  { 
    title: "阴虚质", 
    subtitle: "口燥咽干，手足心热", 
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    description: "体形瘦削，口燥咽干，手足心热，喜冷饮。多因熬夜过度或辛辣过食。",
    features: ["两颧潮红，目干涩", "睡眠欠佳，心烦易怒", "舌红少津，少苔"],
    principle: "滋阴清热，生津润燥。",
    herbs: "百合、枸杞、玉竹、麦冬。",
    recommend: "滋阴玉竹丸"
  },
  { 
    title: "痰湿质", 
    subtitle: "形体肥胖，黏腻不爽", 
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800",
    description: "面部皮肤油腻较多，汗多且黏，胸闷。常见于饮食肥甘厚味者。",
    features: ["腹部肥满松软", "口中黏腻或有甜味", "舌苔白腻，脉滑"],
    principle: "健脾利湿，化痰息风。",
    herbs: "陈皮、茯苓、薏米、半夏。",
    recommend: "健脾祛湿茶"
  },
  { 
    title: "湿热质", 
    subtitle: "面垢油光，口苦苔黄", 
    image: "https://images.unsplash.com/photo-1599426417085-703340ce4ef4?auto=format&fit=crop&q=80&w=800",
    description: "面部油垢，易生粉刺，口苦口干。多因长期烟酒、辛辣或湿热气候影响。",
    features: ["大便黏滞不爽，小便短黄", "舌质偏红，苔黄腻", "易生痤疮，身重困倦"],
    principle: "清热利湿，分消走泄。",
    herbs: "赤小豆、绿豆、土茯苓、茵陈。",
    recommend: "清热薏米饮"
  },
  { 
    title: "血瘀质", 
    subtitle: "肤色晦暗，舌质紫暗", 
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=800",
    description: "肤色晦暗，色素沉着，容易出现瘀斑。常见于长期情绪压抑或久病者。",
    features: ["眼眶黯黑，发易脱", "女性多见痛经、经色紫暗", "舌质紫暗或有瘀点"],
    principle: "活血化瘀，疏经通络。",
    herbs: "当归、川芎、山楂、红花。",
    recommend: "活血桃仁膏"
  },
  { 
    title: "气郁质", 
    subtitle: "忧郁脆弱，气机不畅", 
    image: "https://images.unsplash.com/photo-1493191399948-dc1806658e91?auto=format&fit=crop&q=80&w=800",
    description: "神情抑郁，情感脆弱，烦闷不乐。多因长期精神压力或性格内向。",
    features: ["常叹气，胸胁胀满", "咽间有异物感", "舌淡红，苔薄白"],
    principle: "疏肝解郁，理气安神。",
    herbs: "玫瑰花、薄荷、合欢花、佛手。",
    recommend: "疏肝玫瑰茶"
  },
  { 
    title: "特禀质", 
    subtitle: "易过敏，体质特殊", 
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    description: "过敏体质，易患哮喘、荨麻疹。多为先天禀赋，或遗传因素所致。",
    features: ["易鼻塞、喷嚏、流涕", "皮肤易起风团、瘙痒", "对季节、环境变化敏感"],
    principle: "益气固表，养血平肝。",
    herbs: "乌梅、防风、蝉衣、灵芝。",
    recommend: "固表乌梅丸"
  },
];

const PRODUCTS = [
  { id: 1, name: "固本培元茶", price: 128, sales: 1200, image: "https://images.unsplash.com/photo-1594631252845-29fc4586c567?auto=format&fit=crop&q=80&w=400", tag: "人气爆款" },
  { id: 2, name: "滋阴润肺膏", price: 198, sales: 850, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400", tag: "时令推荐" },
  { id: 3, name: "补气养血丸", price: 256, sales: 640, image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400", tag: "经典古方" },
  { id: 4, name: "清热祛湿饮", price: 88, sales: 2100, image: "https://images.unsplash.com/photo-1599426417085-703340ce4ef4?auto=format&fit=crop&q=80&w=400", tag: "夏日必备" },
];

const ORDERS = [
  { id: "ORD2024040501", status: "待收货", date: "2024-04-05", total: 256, items: ["补气养血丸 x1"], icon: <Truck className="w-5 h-5 text-blue-500" /> },
  { id: "ORD2024040102", status: "已完成", date: "2024-04-01", total: 128, items: ["固本培元茶 x1"], icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
  { id: "ORD2024032803", status: "待付款", date: "2024-03-28", total: 88, items: ["清热祛湿饮 x1"], icon: <AlertCircle className="w-5 h-5 text-orange-500" /> },
];

// --- 子组件 ---

function HomePage({ onConsult, onSelectConstitution }: { onConsult: () => void, onSelectConstitution: (c: any) => void, key?: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <section className="relative h-[400px] px-6 pt-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-transparent to-surface" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 glass-card p-8 rounded-2xl mt-12"
        >
          <h2 className="text-3xl font-serif mb-2 leading-tight">古法智慧 阴阳平衡</h2>
          <p className="text-primary/70 text-sm mb-6">基于中医核心原理的个性化健康评估</p>
          <button 
            onClick={onConsult}
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            点击咨询
          </button>
        </motion.div>
      </section>

      {/* Constitution Grid */}
      <section className="px-6 py-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-serif">体质辨识</h2>
          <span className="text-xs text-primary/40">点击查看详情</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {CONSTITUTIONS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectConstitution(item)}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                <h3 className="text-lg font-serif">{item.title}</h3>
                <p className="text-[10px] opacity-90 text-right">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enterprise Display */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-serif mb-6">企业展示</h2>
        <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800" 
            alt="Enterprise video placeholder" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/40 transform group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function ConstitutionDetail({ constitution, onClose }: { constitution: any, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 bg-surface overflow-y-auto hide-scrollbar"
    >
      {/* 海报背景图 */}
      <div className="relative h-[65vh] w-full">
        <img 
          src={constitution.image} 
          alt={constitution.title} 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
        
        {/* 悬浮返回按钮 */}
        <button onClick={onClose} className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white z-20">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>

        {/* 海报文字覆盖层 */}
        <div className="absolute bottom-12 left-8 right-8 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-5xl font-serif text-primary mb-2 drop-shadow-sm">{constitution.title}</h2>
            <p className="text-secondary text-lg font-medium tracking-widest uppercase opacity-80">{constitution.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* 内容详情卡片 */}
      <div className="px-6 -mt-8 relative z-20">
        <div className="bg-white/80 backdrop-blur-2xl p-8 rounded-[40px] shadow-2xl border border-white/40">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-primary/10" />
            <span className="text-[10px] font-medium tracking-[0.2em] text-primary/40 uppercase">中医辨证详情</span>
            <div className="h-px flex-1 bg-primary/10" />
          </div>

          <p className="text-primary/80 text-base leading-relaxed mb-10 font-serif italic text-center">
            “{constitution.description}”
          </p>

          <div className="grid grid-cols-1 gap-10">
            <DetailSection title="辨证特征" items={constitution.features} />
            
            <div className="grid grid-cols-2 gap-6">
              <DetailSection title="调理原则" content={constitution.principle} />
              <DetailSection title="草本建议" content={constitution.herbs} />
            </div>
          </div>

          <div className="mt-12 p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-primary/40 mb-1">推荐方案</p>
              <p className="text-lg font-serif font-semibold text-primary">{constitution.recommend}</p>
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-2xl text-sm font-medium shadow-lg shadow-primary/20">
              立即定制
            </button>
          </div>
        </div>
      </div>
      <div className="h-20" />
    </motion.div>
  );
}

function DetailSection({ title, items, content }: { title: string, items?: string[], content?: string }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <div className="w-1 h-4 bg-secondary rounded-full" />
        {title}
      </h4>
      {items ? (
        <ul className="grid grid-cols-1 gap-2">
          {items.map((item, i) => (
            <li key={i} className="text-xs text-primary/60 flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/20 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-primary/60 leading-relaxed">{content}</p>
      )}
    </div>
  );
}

function ProductPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 py-4">
      <div className="flex gap-4 mb-6 overflow-x-auto hide-scrollbar py-2">
        {["全部", "调理茶饮", "滋补膏方", "草本丸剂", "养生周边"].map((cat) => (
          <span key={cat} className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${cat === "全部" ? "bg-primary text-white" : "bg-surface-container-low text-primary/60"}`}>
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-outline-variant">
            <div className="relative aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <span className="absolute top-2 left-2 bg-secondary/90 text-white text-[10px] px-2 py-0.5 rounded-full">{product.tag}</span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium mb-1 truncate">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-secondary font-serif font-semibold">¥{product.price}</span>
                <span className="text-[10px] text-primary/40">已售 {product.sales}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function OrderPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 py-4">
      <div className="flex justify-between mb-8 border-b border-outline-variant">
        {["全部", "待付款", "待发货", "待收货", "退换/售后"].map((tab) => (
          <span key={tab} className={`pb-2 text-sm ${tab === "全部" ? "text-primary border-b-2 border-primary font-medium" : "text-primary/40"}`}>
            {tab}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        {ORDERS.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-2xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                {order.icon}
                <span className="text-xs font-medium">{order.status}</span>
              </div>
              <span className="text-[10px] text-primary/40">{order.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium mb-1">{order.items[0]}</p>
                <p className="text-[10px] text-primary/40">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-serif font-semibold">¥{order.total}</p>
                <button className="mt-2 text-[10px] px-3 py-1 rounded-full border border-primary/20 text-primary">查看详情</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ProfilePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-8">
      {/* User Info */}
      <div className="bg-primary/5 px-6 pt-12 pb-8 rounded-b-[40px] mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-white overflow-hidden">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-semibold">草本生活家</h2>
            <p className="text-xs text-primary/60">会员等级：黄金会员</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-lg font-serif font-semibold">1280</p>
            <p className="text-[10px] text-primary/40">积分</p>
          </div>
          <div className="text-center border-x border-primary/10">
            <p className="text-lg font-serif font-semibold">3</p>
            <p className="text-[10px] text-primary/40">优惠券</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-serif font-semibold">¥0.00</p>
            <p className="text-[10px] text-primary/40">余额</p>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-6 space-y-2">
        <ProfileMenuItem icon={<Wallet className="w-5 h-5" />} label="我的钱包" />
        <ProfileMenuItem icon={<Ticket className="w-5 h-5" />} label="领券中心" />
        <ProfileMenuItem icon={<Star className="w-5 h-5" />} label="我的收藏" />
        <div className="h-4" />
        <ProfileMenuItem icon={<MapPin className="w-5 h-5" />} label="收货地址" />
        <ProfileMenuItem icon={<Headset className="w-5 h-5" />} label="在线客服" />
        <ProfileMenuItem icon={<Settings className="w-5 h-5" />} label="设置" />
      </div>
    </motion.div>
  );
}

function ProfileMenuItem({ icon, label }: { icon: ReactNode, label: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-outline-variant shadow-sm cursor-pointer hover:bg-surface-container-low transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-primary/60">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-primary/20" />
    </div>
  );
}

// --- 主应用 ---

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [showConsult, setShowConsult] = useState(false);
  const [selectedConstitution, setSelectedConstitution] = useState<any>(null);

  return (
    <div className="min-h-screen bg-surface pb-32">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center sticky top-0 z-40 bg-surface/80 backdrop-blur-md">
        <Menu className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-serif font-medium">
          {activeTab === "home" && "遇见思邀"}
          {activeTab === "product" && "草本工坊"}
          {activeTab === "order" && "订单中心"}
          {activeTab === "profile" && "个人中心"}
        </h1>
        <div className="flex gap-4">
          {activeTab === "product" && <Search className="w-6 h-6 text-primary" />}
          <ShoppingBag className="w-6 h-6 text-primary" />
        </div>
      </header>

      <main>
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <HomePage 
              key="home" 
              onConsult={() => setShowConsult(true)} 
              onSelectConstitution={(c) => setSelectedConstitution(c)}
            />
          )}
          {activeTab === "product" && <ProductPage key="product" />}
          {activeTab === "order" && <OrderPage key="order" />}
          {activeTab === "profile" && <ProfilePage key="profile" />}
        </AnimatePresence>
      </main>

      {/* Floating Navigation */}
      <nav className="floating-nav">
        <NavItem icon={<Home className="w-5 h-5" />} label="首页" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <NavItem icon={<Package className="w-5 h-5" />} label="产品" active={activeTab === "product"} onClick={() => setActiveTab("product")} />
        <NavItem icon={<ClipboardList className="w-5 h-5" />} label="订单" active={activeTab === "order"} onClick={() => setActiveTab("order")} />
        <NavItem icon={<User className="w-5 h-5" />} label="我的" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
      </nav>

      {/* Constitution Detail Overlay */}
      <AnimatePresence>
        {selectedConstitution && (
          <ConstitutionDetail 
            constitution={selectedConstitution} 
            onClose={() => setSelectedConstitution(null)} 
          />
        )}
      </AnimatePresence>

      {/* Consult Modal (Mock) */}
      <AnimatePresence>
        {showConsult && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end"
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="w-full bg-surface rounded-t-[40px] p-8 pb-12"
            >
              <div className="w-12 h-1.5 bg-primary/10 rounded-full mx-auto mb-8" />
              <h2 className="text-2xl font-serif mb-4 text-center">开启您的健康评估</h2>
              <p className="text-primary/60 text-sm text-center mb-8">我们将通过几个简单的问题，为您匹配最适合的草本调理方案。</p>
              <div className="space-y-4">
                <button className="w-full py-4 bg-primary text-white rounded-2xl font-medium">开始辨识</button>
                <button onClick={() => setShowConsult(false)} className="w-full py-4 text-primary/40 text-sm">稍后再说</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 ${active ? 'text-primary scale-110' : 'text-primary/30 hover:text-primary/50'}`}
    >
      {icon}
      <span className={`text-[10px] font-medium ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    </div>
  );
}
