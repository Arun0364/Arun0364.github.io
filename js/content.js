/*
  ============================================================
  CONTENT.JS - everything you'd want to edit lives in here.
  ============================================================

  This is the ONLY file you should need to touch to update text,
  links, skills, or project details. index.html, style.css and
  app.js just read this object and render it. You don't need to
  understand those to make changes.

  Rules for editing safely:
  - Keep the quotes "like this" around every piece of text.
  - Keep the commas at the end of each line inside a list { }.
  - If you want to remove a whole item (e.g. a skill category,
    a project, a link), delete the entire { ... } block for it,
    including its surrounding commas.
  - To add a new item, copy an existing { ... } block, paste it
    above or below, and edit the text inside.

  Save the file and refresh the page in your browser. That's it,
  no build step, no compiling.
*/

const CONTENT = {

  // Browser tab title + search engine description
  meta: {
    title: "Arun Sujatha Bharath Raj - Bioinformatics & AI-Biology",
    description: "Portfolio of Arun Sujatha Bharath Raj: cfDNA fragmentomics pipeline and genomic foundation model fine-tuning projects."
  },

  // Top navigation bar
  nav: {
    brand: "arun@bioinformatics",
    links: [
      { label: "about",    href: "#about" },
      { label: "skills",   href: "#skills" },
      { label: "projects", href: "#projects" },
      { label: "contact",  href: "#contact" }
    ]
  },

  // Top-of-page hero section
  hero: {
    terminalLine: "whoami",
    name: "Arunannamalai (Arun) Sujatha Bharath Raj",
    kicker: "OPEN_TO: bioinformatics & AI-biology roles · graduating Dec 2026",
    headlineLine1: "Building reproducible ML",
    headlineAccent: "pipelines for genomics",
    headlineLine2: "and cancer biology.",
    lede: "MS Quantitative Biology & Bioinformatics at Carnegie Mellon. I build end-to-end computational biology projects, including containerized cfDNA analysis pipelines and fine-tuned genomic foundation models. I treat a suspiciously good result as a bug report before I treat it as a win.",
    ctas: [
      { label: "./view_projects.sh", href: "#projects", style: "primary" },
      { label: "arun03bt@gmail.com", href: "mailto:arun03bt@gmail.com", style: "ghost", icon: "mail" },
      { label: "github.com/Arun0364", href: "https://github.com/Arun0364", style: "ghost", icon: "github" }
    ]
  },

  about: {
    sectionLabel: "about.md",
    heading: "From wet-lab intuition to production-grade pipelines",
    paragraphs: [
      "I work at the intersection of computational biology and applied machine learning: building pipelines that turn raw sequencing signal into biological insight, and testing whether ML models trained on genomic data are learning real biology or just an artifact of how the data was collected.",
      "Both projects on this site follow the same discipline: treat a suspiciously good result as a bug report first, not a win. In my cfDNA pipeline, a 100% accuracy score turned out to be a batch effect between two studies; in my genomic foundation model project, the official train/test split had ~94% near-duplicate sequence leakage between negatives. Catching both before publishing the results is the throughline of how I approach this kind of work.",
      "That same discipline carries into my current thesis research in the Schwartz Lab at CMU, where I'm reconstructing clonal lineage in glioblastoma from spatial transcriptomics data: combining archetypal analysis to identify pure transcriptional cell states, deconvolution to decompose each spatial spot into fractional state contributions, and phylogenetic inference to relate those states to one another. It's still in progress, so it isn't written up as a project here yet, but it's the same underlying question as everything else on this site: does a strong-looking result reflect real spatial and biological structure, or an artifact of the method.",
      "Currently building toward a portfolio of computational biology work ahead of graduation in December 2026, aiming to contribute to teams applying ML to genomics, oncology, and biomarker discovery."
    ],
    facts: [
      { label: "education",  value: "MS Quantitative Biology & Bioinformatics, CMU" },
      { label: "graduating", value: "December 2026" },
      { label: "focus",      value: "genomics · cancer biology · applied ML" },
      { label: "current thesis", value: "GBM spatial transcriptomics, Schwartz Lab" },
      { label: "email",      value: "arun03bt@gmail.com", href: "mailto:arun03bt@gmail.com" },
      { label: "github",     value: "@Arun0364", href: "https://github.com/Arun0364" }
    ]
  },

  // Skills grid - each category is one card
  skills: {
    sectionLabel: "skills.json",
    heading: "Tools I use to go from raw data to a defensible result",
    categories: [
      {
        name: "programming",
        items: ["Python", "Pandas", "NumPy", "Biopython", "pysam", "scikit-learn", "PyTorch", "HuggingFace Transformers", "R", "Seurat", "DESeq2", "Bioconductor", "ggplot2", "Bash/Unix", "Git", "SQL"]
      },
      {
        name: "pipeline_infra",
        items: ["Nextflow", "Docker", "AWS Batch", "GCP Batch", "SLURM (PSC Bridges-2)", "config-driven workflow design", "dependency-chained pipelines", "reproducible, version-controlled analysis"]
      },
      {
        name: "genomics",
        items: ["scRNA-seq", "bulk RNA-seq", "spatial transcriptomics (10x Visium)", "ATAC-seq", "cfDNA fragmentomics", "NGS data analysis", "BEDTools", "Seurat", "Scanpy", "large-scale dataset management"]
      },
      {
        name: "stats_methods",
        items: ["deep learning & genomic foundation model fine-tuning", "archetypal analysis", "unsupervised clustering (K-means, GMM/EM)", "dimensionality reduction (PCA, UMAP, t-SNE)", "random forest", "statistical modeling", "multi-omic data integration"]
      }
    ]
  },

  // Projects - each object renders as one full project block
  projects: {
    sectionLabel: "projects/",
    heading: "Selected work",
    sub: "Two portfolio projects, each documented end-to-end with real results, honest limitations, and a methodological catch worth knowing about before trusting the numbers.",
    items: [
      {
        status: "complete",
        title: "cfDNA Fragmentomics Pipeline",
        subtitle: "Detecting cancer signal in cell-free DNA fragmentation patterns",
        description: "A reproducible, containerized pipeline inspired by the DELFI method (Cristiano et al., Nature, 2019). Cancer cells have more disorganized chromatin than healthy cells, producing a measurably higher ratio of short-to-long cfDNA fragments in blood plasma. This pipeline extracts per-chromosome fragment ratios from public FinaleDB data and classifies cancer vs. healthy plasma samples with a random forest.",
        highlightTitle: "Caught a batch effect before trusting the result.",
        highlight: "An early version scored a suspicious 100% leave-one-out accuracy: the \"cancer\" and \"healthy\" groups turned out to come from two different studies with different lab processing. Re-pulling both groups from the same study dropped accuracy to a more credible 80%, with feature importance concentrating on specific chromosomes instead of spreading uniformly across all 22, a signature of real biological signal, not a processing artifact.",
        metrics: [
          { value: "0.80",        label: "accuracy (LOOCV)" },
          { value: "0.85 / 0.73", label: "cancer precision / recall" },
          { value: "n = 30",      label: "matched samples, 1 study" },
          { value: "chr4",        label: "top predictive feature" }
        ],
        figures: [],
        stack: ["Nextflow", "Docker", "Python", "scikit-learn", "FinaleDB", "AWS / GCP Batch"],
        links: [
          { label: "view_source", href: "https://github.com/Arun0364/cfdna-fragmentomics-pipeline", style: "primary" }
        ]
      },
      {
        status: "complete",
        title: "Genomic Foundation Model Fine-tuning",
        subtitle: "Fine-tuning HyenaDNA on human promoter classification, with interpretability",
        description: "Fine-tuned HyenaDNA, a long-convolution genomic foundation model, to classify 251bp human DNA sequences as promoters or non-promoters, benchmarked it against a k-mer + logistic regression baseline, and interpreted what the model actually learned using in-silico mutagenesis and a position-wise \"logit lens\" readout of the classification head.",
        highlightTitle: "Found and fixed a leakage problem in the official dataset split.",
        highlight: "The published GenomicBenchmarks train/test split for this dataset had 0% exact duplication but ~94% near-duplicate sequence overlap between negative-class train and test windows. A clean, cluster-aware split was rebuilt from scratch (union-find over shared 50-mers) before any result here was trusted.",
        secondHighlightTitle: "Interpretability took two attempts.",
        secondHighlight: "Naive in-silico mutagenesis pointed to the last 15 bases of the sequence, which turned out to be a pooling artifact, not biology (confirmed by reading the model's source). Switching to a position-wise \"logit lens\" readout of the classification head instead surfaced a specific, plausible signal ~140-180bp upstream of the transcription start site, which cross-referenced against JASPAR motifs shows enrichment for the SP1 transcription factor, consistent with known GC-box promoter biology.",
        metrics: [
          { value: "0.901",  label: "ROC-AUC (fine-tuned)" },
          { value: "+0.031", label: "AUC vs. k-mer baseline" },
          { value: "0.819",  label: "accuracy" },
          { value: "36,131", label: "sequences, clean split" }
        ],
        figures: [
          { src: "images/ism_importance_profile.png", caption: "ISM importance profile: dominated by a pooling artifact near the sequence end" },
          { src: "images/position_lens_trajectory.png", caption: "Position-wise logit lens: where the model actually accumulates class evidence" }
        ],
        stack: ["PyTorch", "HuggingFace Transformers", "HyenaDNA", "scikit-learn", "JASPAR", "Google Colab (T4 GPU)"],
        links: [
          { label: "view_source", href: "https://github.com/Arun0364/genomic-finetune", style: "primary" },
          { label: "model_weights", href: "https://huggingface.co/ArunBt64/hyenadna-tiny-nontata-promoters", style: "ghost" }
        ]
      }
    ]
  },

  contact: {
    sectionLabel: "contact.sh",
    heading: "Let's talk about bioinformatics, ML, or both",
    blurb: "I'm looking for opportunities in bioinformatics and AI-biology roles ahead of graduating in December 2026. Reach out if any of this work is relevant to your team.",
    links: [
      { label: "arun03bt@gmail.com", href: "mailto:arun03bt@gmail.com", style: "primary", icon: "mail" },
      { label: "github.com/Arun0364", href: "https://github.com/Arun0364", style: "ghost", icon: "github" },
      { label: "linkedin.com/in/arun-sujatha", href: "https://linkedin.com/in/arun-sujatha", style: "ghost", icon: "linkedin" }
    ]
  },

  footer: {
    text: "© 2026 Arunannamalai Sujatha Bharath Raj. Built by hand, rendered in a terminal."
  }
};
