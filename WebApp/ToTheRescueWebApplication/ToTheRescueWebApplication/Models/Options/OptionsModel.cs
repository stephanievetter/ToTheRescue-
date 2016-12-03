﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Models
{
    public class OptionsModel
    {
        public int profileID { get; set; }
        public string profileName { get; set; }
        public bool toggleSound { get; set; }
        public bool toggleMusic { get; set; }
        public int MathDifficultyLevel { get; set; }
        public float MathPerformanceStat { get; set; }
        public int ReadingDifficultyLevel { get; set; }
        public float ReadingPerformanceStat { get; set; }
        public string SubjectFilter { get; set; }

        public OptionsModel()
        {

        }

        public OptionsModel(Options entity)
        {
            this.profileID = entity.profileID;
            this.profileName = entity.profileName;
            this.toggleSound = entity.toggleSound;
            this.toggleMusic = entity.toggleMusic;
            this.MathDifficultyLevel = entity.MathDifficultyLevel;
            this.MathPerformanceStat = entity.MathPerformanceStat;
            this.ReadingDifficultyLevel = entity.ReadingDifficultyLevel;
            this.ReadingPerformanceStat = entity.ReadingPerformanceStat;
        }
    }

}