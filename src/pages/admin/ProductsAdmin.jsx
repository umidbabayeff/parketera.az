import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { categories } from '../../data/products'; // Keep static categories for now
import { useNavigate, Link } from 'react-router-dom';

const ProductsAdmin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || (p.category_id || p.categoryId) === parseInt(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu məhsulu silməyə əminsiniz?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Silinmə zamanı xəta yarandı: ' + error.message);
      }
    }
  };

  const getCategoryName = (id) => {
    return categories.find(c => c.id === id)?.name || 'Bilinmir';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Məhsullar</h1>
          <p className="text-white/50">Saytdakı bütün məhsulların idarə edilməsi</p>
        </div>
        <button 
          className="bg-accent-gold hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
          onClick={() => navigate('/admin/products/new')}
        >
          <Plus size={20} />
          Yeni Məhsul
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Məhsul adı ilə axtar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-accent-gold transition-colors"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        </div>
        <div className="relative md:w-64">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-accent-gold transition-colors appearance-none"
          >
            <option value="all" className="bg-bg-dark">Bütün Kateqoriyalar</option>
            {categories.map(c => (
              <option key={c.id} value={c.id} className="bg-bg-dark">{c.name}</option>
            ))}
          </select>
          <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        </div>
      </div>

      <div className="bg-bg-dark border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-white/70 font-medium">Şəkil</th>
                <th className="p-4 text-white/70 font-medium">Ad</th>
                <th className="p-4 text-white/70 font-medium">Kateqoriya</th>
                <th className="p-4 text-white/70 font-medium">Qiymət</th>
                <th className="p-4 text-white/70 font-medium">Stok</th>
                <th className="p-4 text-white/70 font-medium text-right">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-white/50">Yüklənir...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-white/50">Məhsul tapılmadı.</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-white/50">Axtarışa uyğun məhsul tapılmadı.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <img 
                        src={product.image || product.image_url || '/images/engineered.png'} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded bg-white/10"
                      />
                    </td>
                    <td className="p-4 text-white font-medium">{product.name}</td>
                    <td className="p-4 text-white/70">{getCategoryName(product.category_id || product.categoryId)}</td>
                    <td className="p-4 text-white/70">{product.price ? `${product.price} AZN` : 'Razılaşma ilə'}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.in_stock || product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {product.in_stock || product.inStock ? 'Anbarda var' : 'Bitib'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/products/edit/${product.id}`} className="p-2 text-white/50 hover:text-accent-gold transition-colors" title="Redaktə et">
                          <Edit2 size={18} />
                        </Link>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-white/50 hover:text-red-400 transition-colors" title="Sil">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsAdmin;
