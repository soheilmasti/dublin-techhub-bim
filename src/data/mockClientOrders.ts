import { ProjectOrder } from '../types';

export const MOCK_ORDERS: ProjectOrder[] = [
  {
    orderId: 'BIM-IE-2026-08',
    clientName: 'D2 Commercial Architects Ltd',
    projectTitle: 'Dublin TechHub Block B - LOD 350 Model & Multi-Discipline Clash Audit',
    location: 'Grand Canal Dock, Dublin 2, Ireland',
    countryCode: 'IE',
    lodLevel: 'LOD 350 (Architecture + Structure + MEP)',
    startDate: '01/09/2026',
    targetDelivery: '15/10/2026',
    status: 'In Progress',
    currentStage: 'RIBA Stage 4 // Navisworks Clash Matrix & Drawing Sheets',
    overallProgress: 82,
    milestones: [
      {
        stageNumber: 1,
        stageName: 'Stage 1: BEP & Office Template Calibration',
        description: 'BIM Execution Plan alignment, shared parameter mapping, title block setup',
        completed: true,
        current: false,
        date: '04/09/2026'
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2: Architectural & Structural Shell (LOD 300)',
        description: 'High-precision RC structural frame, facade curtain walling, core walls & risers',
        completed: true,
        current: false,
        date: '12/09/2026'
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3: MEP Coordination & Service Riser Detailing (LOD 350)',
        description: 'HVAC ductwork, cable trays, drainage fall lines, and ceiling plenum clearance',
        completed: true,
        current: false,
        date: '18/09/2026'
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4: Clash Resolution & BCF Report Generation',
        description: 'Multi-discipline clash test in Navisworks Manage; 128 clashes reduced to 4 soft clashes',
        completed: false,
        current: true,
        date: '25/09/2026'
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5: Final CD Drawing Sheets & IFC Model Handover',
        description: 'Full GA plans, sections, elevations, door/window schedules, COBie data drop',
        completed: false,
        current: false,
        date: '15/10/2026'
      }
    ],
    weeklyReports: [
      {
        weekNumber: 4,
        weekRange: '15/09/2026 - 22/09/2026',
        clashesResolved: 34,
        sheetsDelivered: 18,
        modelHealthScore: '99.2% Clean (0 Unresolved Warnings)',
        summary: 'Completed Level 3 & 4 ceiling plenum clash resolution. Structural penetration sleeves coordinated with mechanical engineer.',
        achievements: [
          'Resolved 34 hard clashes between primary duct runs and concrete downstand beams.',
          'Produced 18 coordinated general arrangement floor plans and wall section callouts.',
          'Model size optimized to 184 MB with zero duplicated type parameters.',
          'Daily cloud synchronization with client Autodesk Construction Cloud (ACC) project.'
        ],
        nextWeekPlan: [
          'Finalize Level 5 penthouse plant room coordination.',
          'Generate automated door and acoustic partition schedule sheets.',
          'Run final Navisworks clash audit for client sign-off meeting.'
        ],
        revitAuditStatus: 'Passed'
      },
      {
        weekNumber: 3,
        weekRange: '08/09/2026 - 15/09/2026',
        clashesResolved: 48,
        sheetsDelivered: 12,
        modelHealthScore: '98.5% Clean',
        summary: 'Structural core and primary steel framing completed. Began MEP distribution routing on Levels 1 and 2.',
        achievements: [
          'Modeled composite slab decking and perimeter edge trims.',
          'Integrated fire damper locations in accordance with Irish Technical Guidance Document B.',
          'Conducted weekly live Teams review with lead project architect in Dublin.'
        ],
        nextWeekPlan: [
          'Begin plenum clash sweep for Levels 3 & 4.',
          'Detail exterior louvers and rainwater drainage risers.'
        ],
        revitAuditStatus: 'Passed'
      },
      {
        weekNumber: 2,
        weekRange: '01/09/2026 - 08/09/2026',
        clashesResolved: 16,
        sheetsDelivered: 6,
        modelHealthScore: '97.8% Clean',
        summary: 'Initial project setup, grid systems, levels, and basement substructure modeling.',
        achievements: [
          'Imported site survey point cloud and georeferenced coordinates to Irish Transverse Mercator (ITM).',
          'Established shared coordinates across architecture and structural Revit models.'
        ],
        nextWeekPlan: [
          'Complete podium levels and architectural curtain wall grids.'
        ],
        revitAuditStatus: 'Passed'
      }
    ],
    cloudWorkspace: {
      platform: 'Autodesk Construction Cloud (ACC)',
      hubName: 'Dublin Architects // Project 2026-TechHub',
      centralModelName: 'DTH-BIMCO-ARC-MOD-ZZ-M3-A-0001.rvt',
      lastSyncTime: 'Today at 17:15 GMT'
    }
  },
  {
    orderId: 'BIM-UK-2026-12',
    clientName: 'London Southwark Design Partnership',
    projectTitle: 'Southwark Mixed-Use Residential Tower - LOD 400 Technical Drawing Package',
    location: 'Southwark, London SE1, United Kingdom',
    countryCode: 'GB',
    lodLevel: 'LOD 400 (Fabrication & Assembly)',
    startDate: '10/09/2026',
    targetDelivery: '28/10/2026',
    status: 'In Progress',
    currentStage: 'RIBA Stage 4 // Unit Layouts & Prefabricated Facade Details',
    overallProgress: 54,
    milestones: [
      {
        stageNumber: 1,
        stageName: 'Stage 1: UK BIM Framework Alignment & Naming Audit',
        description: 'BS EN ISO 19650-2 container naming conventions and Uniclass 2015 tables',
        completed: true,
        current: false,
        date: '12/09/2026'
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2: Core Tower Shell & Typical Residential Pods (LOD 350)',
        description: 'Parametric apartment types A through F with modular bathroom pods',
        completed: true,
        current: false,
        date: '19/09/2026'
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3: Facade Cassette & Balcony Detail Packages (LOD 400)',
        description: 'Thermal break connections, GRC rainscreen panels, and acoustic glazing details',
        completed: false,
        current: true,
        date: '30/09/2026'
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4: Building Regulations Part B/Part L Compliance Sheets',
        description: 'Compartmentation plans, travel distance annotations, cavity barrier layouts',
        completed: false,
        current: false,
        date: '14/10/2026'
      },
      {
        stageNumber: 5,
        stageName: 'Stage 5: Final Tender Package Handover',
        description: '120 drawing sheets exported to PDF & DWG with integrated COBie data drops',
        completed: false,
        current: false,
        date: '28/10/2026'
      }
    ],
    weeklyReports: [
      {
        weekNumber: 2,
        weekRange: '15/09/2026 - 22/09/2026',
        clashesResolved: 21,
        sheetsDelivered: 14,
        modelHealthScore: '99.5% Clean',
        summary: 'Completed typical apartment layouts for floors 4 through 18. Facade unitized curtain wall module created in Revit.',
        achievements: [
          'Created bespoke parametric unitized facade family with interchangeable spandrel panels.',
          'Audited fire-stopping penetrations against UK Building Regulations Approved Document B.',
          'Synced model to client BIM 360 repository with clean audit log.'
        ],
        nextWeekPlan: [
          'Commence detail sections for balcony cantilever connections.',
          'Generate automated window and internal door schedules.'
        ],
        revitAuditStatus: 'Passed'
      }
    ],
    cloudWorkspace: {
      platform: 'Autodesk BIM 360 Docs',
      hubName: 'Southwark Partnership // London Residential',
      centralModelName: 'SWK-BIMCO-ARC-BLD-ZZ-M3-A-0100.rvt',
      lastSyncTime: 'Today at 18:30 GMT'
    }
  },
  {
    orderId: 'BIM-ES-2026-03',
    clientName: 'Estudi d’Arquitectura Barcelona',
    projectTitle: 'Diagonal Innovation Hub - Scan to BIM & Refurbishment Model',
    location: 'Avinguda Diagonal, Barcelona, Spain',
    countryCode: 'ES',
    lodLevel: 'LOD 300 / As-Built Refurbishment',
    startDate: '01/08/2026',
    targetDelivery: '15/09/2026',
    status: 'Completed',
    currentStage: 'Handover Completed // All Deliverables Approved',
    overallProgress: 100,
    milestones: [
      {
        stageNumber: 1,
        stageName: 'Point Cloud Registration & Clean-up',
        description: 'Laser scan E57 point cloud alignment and coordinate registration',
        completed: true,
        current: false,
        date: '05/08/2026'
      },
      {
        stageNumber: 2,
        stageName: 'Existing Historic Structure As-Built Modeling',
        description: 'Vaulted brick arches and load-bearing stone masonry modeled with actual deflections',
        completed: true,
        current: false,
        date: '22/08/2026'
      },
      {
        stageNumber: 3,
        stageName: 'Proposed Architecture & Steel Mezzanines (LOD 300)',
        description: 'New structural steel framework and interior circulation cores',
        completed: true,
        current: false,
        date: '05/09/2026'
      },
      {
        stageNumber: 4,
        stageName: 'Final Drawing Sheets & Client Sign-Off',
        description: 'Full planning and demolition drawing package signed off by client studio',
        completed: true,
        current: false,
        date: '15/09/2026'
      }
    ],
    weeklyReports: [
      {
        weekNumber: 6,
        weekRange: '08/09/2026 - 15/09/2026',
        clashesResolved: 18,
        sheetsDelivered: 28,
        modelHealthScore: '100% Clean',
        summary: 'Final delivery completed on schedule. All 28 municipal approval drawing sheets exported and approved.',
        achievements: [
          'Project successfully signed off with zero outstanding revisions.',
          'Client saved 52% in drafting overhead compared to local agency rates.'
        ],
        nextWeekPlan: [
          'Project completed. Archive package created under ISO 19650 status code A.'
        ],
        revitAuditStatus: 'Passed'
      }
    ],
    cloudWorkspace: {
      platform: 'Autodesk Construction Cloud (ACC)',
      hubName: 'Estudi Diagonal // Barcelona Hub',
      centralModelName: 'DIAG-BIMCO-ARC-EXP-001.rvt',
      lastSyncTime: 'Archived on 15/09/2026'
    }
  }
];
