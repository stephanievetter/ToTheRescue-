﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication.Models;
using ToTheRescueWebApplication.Repositories;

namespace ToTheRescueWebApplication.Controllers
{
    public class OptionsController : Controller
    {
        static private OptionsModel m_options;
        static private OptionsDBRepository m_optionsRepository;

        public OptionsController()
        {
            m_optionsRepository = new OptionsDBRepository();
            Options entity = m_optionsRepository.Get(ImportantVariables.ProfileID);
            m_options = new OptionsModel(entity);
        }
        public ActionResult Options()
        {
            return View(m_options);
        }

        public ActionResult GoToProfiles()
        {
            //User selected to play with a certain profile so I set those important variables

            return RedirectToAction("Profiles", "Profiles");
        }

        [HttpPost]
        public ActionResult Options(OptionsModel model)
        {
            if (ModelState.IsValid)
            {
                Options o = new Options(model);
                m_optionsRepository.Save(o);
            }
            else
            {
                return View(model);
            }
            return RedirectToAction("Options");
        }
    }
}