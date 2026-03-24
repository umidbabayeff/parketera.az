import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { categories } from '../../data/products';
import { ArrowLeft } from 'lucide-react';

const ProductFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: 1,
    price: '',
    inStock: true,
    image: '',
    description: '',
    specs: [{ label: 'Ölçü vahidi', value: 'm²' }]
  });

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (data) {
      setFormData({
        name: data.name || '',
        categoryId: data.categoryId || data.category_id || 1,
        price: data.price || '',
        inStock: data.inStock !== undefined ? data.inStock : data.in_stock,
        image: data.image || data.image_url || '',
        description: data.description || '',
        specs: data.specs || []
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      alert('Şəkil yüklənərkən xəta: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);

    setFormData({ ...formData, image: data.publicUrl });
    setUploading(false);
  };

  const addSpec = () => {
    setFormData({ ...formData, specs: [...formData.specs, { label: '', value: '' }] });
  };

  const updateSpec = (index, field, value) => {
    const newSpecs = [...formData.specs];
    newSpecs[index][field] = value;
    setFormData({ ...formData, specs: newSpecs });
  };

  const removeSpec = (index) => {
    const newSpecs = [...formData.specs];
    newSpecs.splice(index, 1);
    setFormData({ ...formData, specs: newSpecs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      name: formData.name,
      categoryId: parseInt(formData.categoryId),
      price: formData.price ? parseFloat(formData.price) : null,
      inStock: formData.inStock,
      image: formData.image,
      description: formData.description,
      specs: formData.specs
    };

    if (isEditing) {
      await supabase.from('products').update(payload).eq('id', id);
    } else {
      await supabase.from('products').insert([payload]);
    }

    setLoading(false);
    navigate('/admin/products');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={() => navigate('/admin/products')}
        className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        Geri qayıt
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">
        {isEditing ? 'Məhsulu Redaktə Et' : 'Yeni Məhsul Əlavə Et'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-bg-dark border border-white/5 p-8 rounded-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">Adı</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Kateqoriya</label>
            <select 
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id} className="bg-bg-dark">{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">Qiyməti (AZN)</label>
            <input 
              type="number" 
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Məhsul Şəkli</label>
            <div className="flex gap-4 items-center">
              {formData.image && (
                <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded bg-white/10 border border-white/5" />
              )}
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent-gold file:text-black hover:file:bg-yellow-500 cursor-pointer"
                />
                {uploading && <span className="text-white/50 text-xs mt-2 block">Şəkil yüklənir... Gözləyin</span>}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2">Geniş Təsviri</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
          ></textarea>
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="inStock"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            className="w-5 h-5 accent-accent-gold"
          />
          <label htmlFor="inStock" className="text-white">Anbarda var</label>
        </div>

        <div className="pt-6 border-t border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Xüsusiyyətlər (Specs)</h3>
            <button 
              type="button" 
              onClick={addSpec}
              className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Özəllik əlavə et
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.specs.map((spec, index) => (
              <div key={index} className="flex gap-4 items-start">
                <input 
                  type="text" 
                  placeholder="Başlıq (məs: Ölçü)"
                  value={spec.label}
                  onChange={(e) => updateSpec(index, 'label', e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
                />
                <input 
                  type="text" 
                  placeholder="Dəyər (məs: 15mm)"
                  value={spec.value}
                  onChange={(e) => updateSpec(index, 'value', e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
                />
                <button 
                  type="button" 
                  onClick={() => removeSpec(index)}
                  className="p-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit" 
            disabled={loading || uploading}
            className="w-full bg-accent-gold hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? 'Saxlanılır...' : 'Yadda Saxla'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
