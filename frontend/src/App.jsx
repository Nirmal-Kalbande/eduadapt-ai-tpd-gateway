import React, { useState } from 'react';
import { Zap, Map, ArrowRight, User, BookOpen, GraduationCap, BarChart3, ExternalLink, Loader2 } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({ name: '', grade: 'Secondary', subject: 'Mathematics', score: 55 });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/analyze-needs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          grade_level: formData.grade,
          subject: formData.subject,
          assessment_score: parseInt(formData.score)
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert("System Offline: Ensure your Python backend is running on port 8000!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#030711', minHeight: '100vh', color: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ padding: '20px 50px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap color="#3b82f6" fill="#3b82f6" size={24} />
          <h1 style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.05em', margin: 0 }}>EduAdapt AI</h1>
        </div>
        <div style={{ fontSize: '10px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold' }}>THEME 2</div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '50px', padding: '50px' }}>
        {/* SIDEBAR WITH ALL INPUTS */}
        <section style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.08)', height: 'fit-content' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>Teacher Diagnostic</h2>
          <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '900', textTransform: 'uppercase', marginBottom: '40px' }}>Step 1: Needs Analysis</p>
          
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569' }}><User size={12}/> TEACHER NAME</label>
              <input type="text" required placeholder="Enter Full Name" style={{ padding: '14px', borderRadius: '14px', border: 'none', background: '#ffffff', color: '#0f172a' }} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569' }}><GraduationCap size={12}/> GRADE</label>
                <select style={{ padding: '14px', borderRadius: '14px', background: '#ffffff', color: '#0f172a' }} onChange={(e) => setFormData({...formData, grade: e.target.value})}>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569' }}><BookOpen size={12}/> SUBJECT</label>
                <select style={{ padding: '14px', borderRadius: '14px', background: '#ffffff', color: '#0f172a' }} onChange={(e) => setFormData({...formData, subject: e.target.value})}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569' }}><BarChart3 size={12}/> SCORE</label>
                <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 'bold' }}>{formData.score}%</span>
              </div>
              <input type="range" min="0" max="100" value={formData.score} style={{ cursor: 'pointer' }} onChange={(e) => setFormData({...formData, score: e.target.value})} />
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: '10px', padding: '18px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              {loading ? <Loader2 className="animate-spin" /> : <>Generate Roadmap <ArrowRight size={18}/></>}
            </button>
          </form>
        </section>

        {/* RESULTS: SAFETY GUARD PREVENTS WHITE SCREEN */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {!result && !loading ? (
             <div style={{ height: '500px', border: '2px dashed rgba(255,255,255,0.05)', borderRadius: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#334155' }}>
               <Map size={64} style={{ marginBottom: '20px', opacity: 0.1 }} />
               <p style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.2em' }}>Awaiting Diagnostic Input</p>
             </div>
          ) : (
            <>
              {/* XAI INSIGHT */}
              <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '30px', borderRadius: '30px', marginBottom: '30px' }}>
                <h4 style={{ color: '#60a5fa', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Explainable AI (XAI) Insight</h4>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#cbd5e1' }}>{result?.xai_insight}</p>
              </div>
              
              {/* ROADMAP PHASES */}
              {result?.roadmap?.map((phase, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '40px', borderRadius: '40px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{phase.phase}</h3>
                    <span style={{ fontSize: '10px', color: '#475569', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '20px' }}>PHASE 0{i+1}</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '24px' }}>{phase.task}</p>
                  
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '20px', fontSize: '13px', color: '#64748b', marginBottom: '24px', fontStyle: 'italic' }}>
                    <strong style={{ color: '#3b82f6', fontStyle: 'normal' }}>WHY: </strong> {phase.why}
                  </div>

                  <a href={phase.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#3b82f6', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
                    Access Training Module <ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </>
          )}
        </section>
      </main>
    </div>
  );
}