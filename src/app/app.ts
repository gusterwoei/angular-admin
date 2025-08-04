import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import * as AppIcons from './common/icons';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('angular-admin');
  readonly icons = AppIcons;

  ngOnInit() {
    this.initialiseUI();
  }

  private initialiseUI() {
    // Mobile sidebar toggle
    const openSidebar = document.getElementById("openSidebar");
    const closeSidebar = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    openSidebar?.addEventListener("click", () => {
      console.log("Open sidebar clicked");
      sidebar?.classList.remove("-translate-x-full");
      overlay?.classList.remove("hidden");
    });

    closeSidebar?.addEventListener("click", () => {
      sidebar?.classList.add("-translate-x-full");
      overlay?.classList.add("hidden");
    });

    overlay?.addEventListener("click", () => {
      sidebar?.classList.add("-translate-x-full");
      overlay?.classList.add("hidden");
    });

    // // Profile dropdown toggle
    const profileButton = document.getElementById("profileButton");
    const profileDropdown = document.getElementById("profileDropdown");

    profileButton?.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown?.classList.toggle("hidden");
    });

    document.addEventListener("click", () => {
      profileDropdown?.classList.add("hidden");
    });

    // Navigation functionality
    this.setupMenuNavigation();

    // Add CSS classes via JavaScript for better Angular compatibility
    const style = document.createElement("style");
    style.textContent = `
            .nav-item {
                display: flex;
                align-items: center;
                padding: 0.75rem;
                color: #d1d5db;
                text-decoration: none;
                border-radius: 0.5rem;
                transition: all 0.2s ease-in-out;
                space-x: 0.75rem;
            }
            .nav-item:hover {
                background-color: #374151;
                color: #ffffff;
            }
            .nav-item.active {
                background-color: #3b82f6;
                color: #ffffff;
            }
            .nav-item i {
                margin-right: 0.75rem;
            }
        `;
    document.head.appendChild(style);
  }

  private setupMenuNavigation() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const navItems = document.querySelectorAll(".nav-item");
    const contentSections = document.querySelectorAll(".content-section");
    const pageTitle = document.getElementById("pageTitle");

    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();

        // Remove active class from all nav items
        // navItems.forEach((nav) => nav.classList.remove("active"));

        // Add active class to clicked item
        // item.classList.add("active");

        // Hide all content sections
        // contentSections.forEach((section) => section.classList.add("hidden"));

        // // Show selected content section
        // const contentId = item.getAttribute("data-content");
        // const targetSection = document.getElementById(contentId!);
        // if (targetSection) {
        //   targetSection.classList.remove("hidden");
        //   // Update page title
        //   pageTitle!.textContent = item?.querySelector("span")?.textContent ?? null;
        // }

        // Close mobile sidebar after navigation
        if (window.innerWidth < 1024) {
          sidebar?.classList.add("-translate-x-full");
          overlay?.classList.add("hidden");
        }
      });
    });
  }
}
