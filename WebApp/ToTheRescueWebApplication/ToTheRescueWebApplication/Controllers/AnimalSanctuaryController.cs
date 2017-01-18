﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Models;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication.Repositories;

namespace ToTheRescueWebApplication.Controllers
{
    [Authorize]
    public class AnimalSanctuaryController : Controller
    {
        ImageDBRepository _image;
        AnimalDBRepository _animal;
        IDataEntityRepository<Sounds> _sounds;
        ProfileDBRepository _profile;
        OptionsDBRepository _options;
        
        public AnimalSanctuaryController()
        {
            _image = new ImageDBRepository();
            _animal = new AnimalDBRepository();
            _sounds = new SoundDBRepository();
            _profile = new ProfileDBRepository(System.Web.HttpContext.Current);
            _options = new OptionsDBRepository();
        }
        public ActionResult Sanctuary()
        {
            List<Animal> listOfAnimals = _animal.GetList((int)Session["profileID"]);//subject to change

            return View(listOfAnimals);
        }
        public ActionResult ShowAnimalImage (int animalID)
        {
            Animal animal = _animal.Get(animalID);
            Images image = _image.Get(animal.ImageID);

            return File(image.Image, image.ImageName);
        }
        public ActionResult PlayAnimalSound(int animalID)
        {
            Animal animal = _animal.Get(animalID);
            Sounds sounds = _sounds.Get(animal.SoundID);

            return File(sounds.Sound, sounds.SoundName);
        }

        public string getProfileName()
        {
            Options options = _options.Get((int)Session["profileID"]);

            return options.profileName;
        }
    }
}