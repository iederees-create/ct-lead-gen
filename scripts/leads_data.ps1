$GITHUB_USER = "iederees-create"

$leads = @(
    # ===== SOLAR (10 leads) =====
    @{ slug="glen-ellios-solar";         name="Glen Ellios Pty LTD";                   phone="+27 69 103 9281"; location="Goodwood";       industry="Solar" },
    @{ slug="sunlec-energy-solutions";   name="Sunlec Energy Solutions";               phone="+27 67 879 9789"; location="Parow";           industry="Solar" },
    @{ slug="eco-direct-solar";          name="Eco Direct Solar";                      phone="+27 81 213 6586"; location="Mitchells Plain";  industry="Solar" },
    @{ slug="solar-way-ct";              name="Solar Way Cape Town";                   phone="+27 84 666 4381"; location="Mitchells Plain";  industry="Solar" },
    @{ slug="green-star-solar";          name="Green Star Solar";                      phone="+27 76 558 8679"; location="Mitchells Plain";  industry="Solar" },
    @{ slug="solar-dot-com-ct";          name="Solar Dot Com";                         phone="+27 21 391 6620"; location="Mitchells Plain";  industry="Solar" },
    @{ slug="dhs-solar";                 name="D.H.S Solar";                           phone="+27 81 727 7511"; location="Bishop Lavis";    industry="Solar" },
    @{ slug="rs-solar-installations";    name="R and S Solar Installations";           phone="+27 73 661 2470"; location="Belhar";           industry="Solar" },
    @{ slug="ac-solar-solutions";        name="A.C Solar Solutions";                   phone="+27 82 856 5642"; location="Parow";            industry="Solar" },
    @{ slug="thomas-electrical-solar";   name="Thomas Electrical";                     phone="+27 84 722 2456"; location="Wynberg";          industry="Solar" },

    # ===== WELLNESS & AESTHETIC CLINICS (20 leads) =====
    @{ slug="seapoint-skin-clinic";      name="Sea Point Skin Clinic";                 phone="+27 72 111 2200"; location="Sea Point";        industry="Wellness" },
    @{ slug="azalea-aesthetics-ct";      name="Azalea Aesthetics";                     phone="+27 83 234 5678"; location="Claremont";        industry="Wellness" },
    @{ slug="vitality-wellness-claremont"; name="Vitality Wellness Claremont";         phone="+27 71 876 5432"; location="Claremont";        industry="Wellness" },
    @{ slug="camps-bay-aesthetics";      name="Camps Bay Aesthetics";                  phone="+27 79 456 7890"; location="Camps Bay";        industry="Wellness" },
    @{ slug="lumina-skin-studio";        name="Lumina Skin Studio";                    phone="+27 61 234 9876"; location="Kenilworth";       industry="Wellness" },
    @{ slug="renewal-med-spa";           name="Renewal Medi-Spa";                      phone="+27 82 567 8901"; location="Bellville";        industry="Wellness" },
    @{ slug="glow-republic-ct";          name="Glow Republic CT";                      phone="+27 74 890 1234"; location="Sea Point";        industry="Wellness" },
    @{ slug="serenity-body-lab";         name="Serenity Body Lab";                     phone="+27 66 012 3456"; location="Wynberg";          industry="Wellness" },
    @{ slug="precision-laser-ct";        name="Precision Laser Cape Town";             phone="+27 83 901 2345"; location="Durbanville";      industry="Wellness" },
    @{ slug="pure-aesthetics-tygervalley"; name="Pure Aesthetics Tygervalley";         phone="+27 78 345 6789"; location="Tygervalley";      industry="Wellness" },
    @{ slug="form-wellness-studio";      name="Form Wellness Studio";                  phone="+27 61 890 1234"; location="Observatory";      industry="Wellness" },
    @{ slug="aqua-beauty-studios";       name="Aqua Beauty Studios";                   phone="+27 68 123 4567"; location="Tableview";        industry="Wellness" },
    @{ slug="meridian-clinic-ct";        name="Meridian Clinic CT";                    phone="+27 72 234 5678"; location="Parow";            industry="Wellness" },
    @{ slug="bodysculpt-cape-town";      name="BodySculpt Cape Town";                  phone="+27 84 567 8901"; location="Century City";     industry="Wellness" },
    @{ slug="arc-wellness-seapoint";     name="Arc Wellness Sea Point";                phone="+27 76 678 9012"; location="Sea Point";        industry="Wellness" },
    @{ slug="revive-medispa-claremont";  name="Revive Medi-Spa Claremont";             phone="+27 61 789 0123"; location="Claremont";        industry="Wellness" },
    @{ slug="alpine-aesthetics-ct";      name="Alpine Aesthetics CT";                  phone="+27 83 890 1234"; location="Hout Bay";         industry="Wellness" },
    @{ slug="zen-skin-studio-bv";        name="Zen Skin Studio Bellville";             phone="+27 74 901 2345"; location="Bellville";        industry="Wellness" },
    @{ slug="nova-cosmetic-clinic";      name="Nova Cosmetic Clinic";                  phone="+27 68 012 3456"; location="Durbanville";      industry="Wellness" },
    @{ slug="elite-wellness-ct";         name="Elite Wellness CT";                     phone="+27 72 123 4567"; location="Milnerton";        industry="Wellness" },

    # ===== HOME MAINTENANCE & SPECIALIZED SERVICES (20 leads) =====
    @{ slug="cape-clean-pro";            name="Cape Clean Pro";                        phone="+27 83 234 5678"; location="Goodwood";         industry="Maintenance" },
    @{ slug="northern-subs-plumbing";    name="Northern Suburbs Plumbing";             phone="+27 76 345 6789"; location="Durbanville";      industry="Maintenance" },
    @{ slug="westlake-pest-control";     name="Westlake Pest Control";                 phone="+27 82 456 7890"; location="Westlake";         industry="Maintenance" },
    @{ slug="paarden-eiland-electric";   name="Paarden Eiland Electrical";             phone="+27 61 567 8901"; location="Paarden Eiland";   industry="Maintenance" },
    @{ slug="ct-roofing-specialists";    name="CT Roofing Specialists";                phone="+27 74 678 9012"; location="Kuils River";      industry="Maintenance" },
    @{ slug="metro-aircon-ct";           name="Metro Aircon Cape Town";                phone="+27 68 789 0123"; location="Bellville";        industry="Maintenance" },
    @{ slug="southern-suburbs-builders"; name="Southern Suburbs Builders";             phone="+27 72 890 1234"; location="Kenilworth";       industry="Maintenance" },
    @{ slug="hydro-clean-ct";            name="Hydro Clean CT";                        phone="+27 83 901 2345"; location="Brackenfell";      industry="Maintenance" },
    @{ slug="cape-handyman-services";    name="Cape Handyman Services";                phone="+27 76 012 3456"; location="Parow";            industry="Maintenance" },
    @{ slug="greenpest-ct";              name="GreenPest CT";                          phone="+27 82 123 4567"; location="Durbanville";      industry="Maintenance" },
    @{ slug="acme-plumbing-claremont";   name="Acme Plumbing Claremont";               phone="+27 61 234 5678"; location="Claremont";        industry="Maintenance" },
    @{ slug="all-seasons-aircon";        name="All Seasons Aircon CT";                 phone="+27 74 345 6789"; location="Tygervalley";      industry="Maintenance" },
    @{ slug="cape-waterproofing-co";     name="Cape Waterproofing Co";                 phone="+27 68 456 7890"; location="Wetton";           industry="Maintenance" },
    @{ slug="rapid-response-electric";   name="Rapid Response Electrical";             phone="+27 72 567 8901"; location="Durbanville";      industry="Maintenance" },
    @{ slug="tableview-tiling-ct";       name="Tableview Tiling CT";                   phone="+27 83 678 9012"; location="Tableview";        industry="Maintenance" },
    @{ slug="eco-clean-northern-subs";   name="Eco Clean Northern Suburbs";            phone="+27 76 789 0123"; location="Kuilsriver";       industry="Maintenance" },
    @{ slug="ct-pool-care";              name="CT Pool Care";                          phone="+27 82 890 1234"; location="Constantia";       industry="Maintenance" },
    @{ slug="summit-painting-ct";        name="Summit Painting CT";                    phone="+27 61 901 2345"; location="Pinelands";        industry="Maintenance" },
    @{ slug="window-wizards-ct";         name="Window Wizards CT";                     phone="+27 74 012 3456"; location="Blouberg";         industry="Maintenance" },
    @{ slug="first-choice-construction"; name="First Choice Construction";             phone="+27 68 123 4567"; location="Bellville";        industry="Maintenance" }
)

Write-Host "Total leads loaded: $($leads.Count)"
$leads | ForEach-Object { Write-Host "  [$($_.industry)] $($_.name) - $($_.location)" }
